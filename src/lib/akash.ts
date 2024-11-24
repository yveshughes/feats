export interface AkashConfig {
    wallet: string;
    provider: string;
    deploymentId?: string;
  }
  
  export class AkashClient {
    private config: AkashConfig;
  
    constructor(config: AkashConfig) {
      this.config = config;
    }
  
    static async initialize(): Promise<AkashClient> {
      if (typeof window === 'undefined') {
        throw new Error('Akash client must be initialized in browser context');
      }
  
      const wallet = localStorage.getItem('akash_wallet');
      const provider = localStorage.getItem('akash_provider');
  
      if (!wallet || !provider) {
        throw new Error('Please connect your wallet to Akash Network first');
      }
  
      return new AkashClient({
        wallet,
        provider
      });
    }
  
    async uploadImage(imageData: Buffer): Promise<string> {
      if (!this.config.wallet) {
        throw new Error('Please connect your wallet first');
      }
  
      try {
        // Create deployment request
        const response = await fetch('https://api.akash.network/deployments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.wallet}`
          },
          body: JSON.stringify({
            spec: {
              image: 'nginx:alpine',
              resources: {
                cpu: 0.1,
                memory: '512Mi',
                storage: '1Gi'
              }
            }
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to create deployment');
        }
  
        const deployment = await response.json();
        this.config.deploymentId = deployment.id;
  
        // Upload image to deployment
        const uploadResponse = await fetch(`https://api.akash.network/deployments/${deployment.id}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.wallet}`
          },
          body: imageData
        });
  
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
  
        const { url } = await uploadResponse.json();
        return url;
  
      } catch (error) {
        console.error('Akash upload error:', error);
        throw new Error('Failed to upload image to Akash Network');
      }
    }
  }
  
  export async function getAkashClient(): Promise<AkashClient> {
    return AkashClient.initialize();
  }
  

