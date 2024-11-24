import { Client, types } from 'cassandra-driver';

let client: Client;

export async function getDatastaxClient() {
  if (client) return client;

  const username = process.env.ASTRA_DB_CLIENT_ID;
  const password = process.env.ASTRA_DB_CLIENT_SECRET;
  const secureConnectBundle = process.env.ASTRA_DB_SECURE_BUNDLE_PATH;

  if (!username || !password || !secureConnectBundle) {
    throw new Error("Datastax Astra DB credentials are not set in environment variables");
  }

  client = new Client({
    cloud: { secureConnectBundle },
    credentials: { username, password },
    keyspace: 'feats'
  });

  await client.connect();
  return client;
}

export interface ImageData {
  id: types.Uuid;
  userId: string;
  imageUrl: string;
  createdAt: Date;
}

export interface AnalysisResult {
  id: types.Uuid;
  imageId: types.Uuid;
  scales: {
    title: string;
    description: string;
    rating: number;
    explanation: string;
  }[];
  createdAt: Date;
}

export interface UserData {
  id: types.Uuid;
  email: string;
  createdAt: Date;
}

export interface AggregateData {
  avgRating: number;
  title: string;
}

export async function storeImageData(imageData: ImageData): Promise<void> {
  const client = await getDatastaxClient();
  const query = 'INSERT INTO images (id, user_id, image_url, created_at) VALUES (?, ?, ?, ?)';
  await client.execute(query, [imageData.id, imageData.userId, imageData.imageUrl, imageData.createdAt], { prepare: true });
}

export async function storeAnalysisResult(result: AnalysisResult): Promise<void> {
  const client = await getDatastaxClient();
  const query = 'INSERT INTO analysis_results (id, image_id, scales, created_at) VALUES (?, ?, ?, ?)';
  await client.execute(query, [result.id, result.imageId, JSON.stringify(result.scales), result.createdAt], { prepare: true });
}

export async function storeUserData(userData: UserData): Promise<void> {
  const client = await getDatastaxClient();
  const query = 'INSERT INTO users (id, email, created_at) VALUES (?, ?, ?)';
  await client.execute(query, [userData.id, userData.email, userData.createdAt], { prepare: true });
}

export async function getImageData(imageId: types.Uuid): Promise<ImageData | null> {
  const client = await getDatastaxClient();
  const query = 'SELECT * FROM images WHERE id = ?';
  const result = await client.execute(query, [imageId], { prepare: true });
  const row = result.first();
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    imageUrl: row.image_url,
    createdAt: row.created_at
  };
}

export async function getAnalysisResult(imageId: types.Uuid): Promise<AnalysisResult | null> {
  const client = await getDatastaxClient();
  const query = 'SELECT * FROM analysis_results WHERE image_id = ?';
  const result = await client.execute(query, [imageId], { prepare: true });
  const row = result.first();
  if (!row) return null;
  return {
    id: row.id,
    imageId: row.image_id,
    scales: JSON.parse(row.scales),
    createdAt: row.created_at
  };
}

export async function getUserData(userId: types.Uuid): Promise<UserData | null> {
  const client = await getDatastaxClient();
  const query = 'SELECT * FROM users WHERE id = ?';
  const result = await client.execute(query, [userId], { prepare: true });
  const row = result.first();
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    createdAt: row.created_at
  };
}

export async function getAggregateData(): Promise<AggregateData[]> {
  const client = await getDatastaxClient();
  const query = 'SELECT AVG(CAST(scale.rating AS float)) as avg_rating, scale.title FROM analysis_results, analysis_results.scales AS scale GROUP BY scale.title';
  const result = await client.execute(query);
  return result.rows.map(row => ({
    avgRating: row.avg_rating,
    title: row.title
  }));
}






