import type { CreateReviewInput } from "./review.schema.js";
export declare const createReview: (userId: string, input: CreateReviewInput) => Promise<{
    appointment: {
        doctor: {
            id: string;
            fullName: string;
        };
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    appointmentId: string;
    rating: number;
    comment: string | null;
}>;
export declare const getDoctorReviews: (doctorId: string) => Promise<{
    average: number;
    totalReviews: number;
    reviews: {
        id: string;
        createdAt: Date;
        appointment: {
            patient: {
                fullName: string;
            };
        };
        rating: number;
        comment: string | null;
    }[];
}>;
//# sourceMappingURL=review.service.d.ts.map