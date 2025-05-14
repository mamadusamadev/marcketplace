export interface SellerApplicationData {
    fullName: string;
    documentId: string;
    iban: string;
}

export interface VerifySellerData {
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_ANALYSIS';
    verificationStatus: 'VERIFIED' | 'REJECTED' | 'MISSING_DOCUMENTS';
    rejectionReason?: string;
  }



export interface AdminSellerListItem {
    id: number;
    fullName: string;
    email: string;
    city: string | null;
    country: string | null;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_ANALYSIS';
    verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'MISSING_DOCUMENTS';
    createdAt: string;
    productsCount: number;
  }
  

export interface SellerPublicProfile {
id: number;
slug: string;
status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_ANALYSIS';
verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'MISSING_DOCUMENTS';
fullName: string;
city: string | null;
country: string | null;
photoUrl: string | null;
createdAt: string;
}