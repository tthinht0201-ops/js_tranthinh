import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model DoctorProfile
 *
 */
export type DoctorProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$DoctorProfilePayload>;
export type AggregateDoctorProfile = {
    _count: DoctorProfileCountAggregateOutputType | null;
    _avg: DoctorProfileAvgAggregateOutputType | null;
    _sum: DoctorProfileSumAggregateOutputType | null;
    _min: DoctorProfileMinAggregateOutputType | null;
    _max: DoctorProfileMaxAggregateOutputType | null;
};
export type DoctorProfileAvgAggregateOutputType = {
    experienceYears: number | null;
};
export type DoctorProfileSumAggregateOutputType = {
    experienceYears: number | null;
};
export type DoctorProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    specialtyId: string | null;
    fullName: string | null;
    phone: string | null;
    bio: string | null;
    experienceYears: number | null;
    avatarUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    specialtyId: string | null;
    fullName: string | null;
    phone: string | null;
    bio: string | null;
    experienceYears: number | null;
    avatarUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    specialtyId: number;
    fullName: number;
    phone: number;
    bio: number;
    experienceYears: number;
    avatarUrl: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DoctorProfileAvgAggregateInputType = {
    experienceYears?: true;
};
export type DoctorProfileSumAggregateInputType = {
    experienceYears?: true;
};
export type DoctorProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    specialtyId?: true;
    fullName?: true;
    phone?: true;
    bio?: true;
    experienceYears?: true;
    avatarUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    specialtyId?: true;
    fullName?: true;
    phone?: true;
    bio?: true;
    experienceYears?: true;
    avatarUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    specialtyId?: true;
    fullName?: true;
    phone?: true;
    bio?: true;
    experienceYears?: true;
    avatarUrl?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DoctorProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorProfile to aggregate.
     */
    where?: Prisma.DoctorProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: Prisma.DoctorProfileOrderByWithRelationInput | Prisma.DoctorProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DoctorProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DoctorProfiles
    **/
    _count?: true | DoctorProfileCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DoctorProfileAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DoctorProfileSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DoctorProfileMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DoctorProfileMaxAggregateInputType;
};
export type GetDoctorProfileAggregateType<T extends DoctorProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateDoctorProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDoctorProfile[P]> : Prisma.GetScalarType<T[P], AggregateDoctorProfile[P]>;
};
export type DoctorProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorProfileWhereInput;
    orderBy?: Prisma.DoctorProfileOrderByWithAggregationInput | Prisma.DoctorProfileOrderByWithAggregationInput[];
    by: Prisma.DoctorProfileScalarFieldEnum[] | Prisma.DoctorProfileScalarFieldEnum;
    having?: Prisma.DoctorProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DoctorProfileCountAggregateInputType | true;
    _avg?: DoctorProfileAvgAggregateInputType;
    _sum?: DoctorProfileSumAggregateInputType;
    _min?: DoctorProfileMinAggregateInputType;
    _max?: DoctorProfileMaxAggregateInputType;
};
export type DoctorProfileGroupByOutputType = {
    id: string;
    userId: string;
    specialtyId: string;
    fullName: string;
    phone: string | null;
    bio: string | null;
    experienceYears: number;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DoctorProfileCountAggregateOutputType | null;
    _avg: DoctorProfileAvgAggregateOutputType | null;
    _sum: DoctorProfileSumAggregateOutputType | null;
    _min: DoctorProfileMinAggregateOutputType | null;
    _max: DoctorProfileMaxAggregateOutputType | null;
};
export type GetDoctorProfileGroupByPayload<T extends DoctorProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DoctorProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DoctorProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DoctorProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DoctorProfileGroupByOutputType[P]>;
}>>;
export type DoctorProfileWhereInput = {
    AND?: Prisma.DoctorProfileWhereInput | Prisma.DoctorProfileWhereInput[];
    OR?: Prisma.DoctorProfileWhereInput[];
    NOT?: Prisma.DoctorProfileWhereInput | Prisma.DoctorProfileWhereInput[];
    id?: Prisma.UuidFilter<"DoctorProfile"> | string;
    userId?: Prisma.UuidFilter<"DoctorProfile"> | string;
    specialtyId?: Prisma.UuidFilter<"DoctorProfile"> | string;
    fullName?: Prisma.StringFilter<"DoctorProfile"> | string;
    phone?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    bio?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    experienceYears?: Prisma.IntFilter<"DoctorProfile"> | number;
    avatarUrl?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    specialty?: Prisma.XOR<Prisma.SpecialtyScalarRelationFilter, Prisma.SpecialtyWhereInput>;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
    dateSchedules?: Prisma.DoctorDateScheduleListRelationFilter;
    blockedTimes?: Prisma.BlockedTimeListRelationFilter;
    appointments?: Prisma.AppointmentListRelationFilter;
};
export type DoctorProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    specialtyId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    specialty?: Prisma.SpecialtyOrderByWithRelationInput;
    schedules?: Prisma.DoctorScheduleOrderByRelationAggregateInput;
    dateSchedules?: Prisma.DoctorDateScheduleOrderByRelationAggregateInput;
    blockedTimes?: Prisma.BlockedTimeOrderByRelationAggregateInput;
    appointments?: Prisma.AppointmentOrderByRelationAggregateInput;
};
export type DoctorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    phone?: string;
    AND?: Prisma.DoctorProfileWhereInput | Prisma.DoctorProfileWhereInput[];
    OR?: Prisma.DoctorProfileWhereInput[];
    NOT?: Prisma.DoctorProfileWhereInput | Prisma.DoctorProfileWhereInput[];
    specialtyId?: Prisma.UuidFilter<"DoctorProfile"> | string;
    fullName?: Prisma.StringFilter<"DoctorProfile"> | string;
    bio?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    experienceYears?: Prisma.IntFilter<"DoctorProfile"> | number;
    avatarUrl?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    specialty?: Prisma.XOR<Prisma.SpecialtyScalarRelationFilter, Prisma.SpecialtyWhereInput>;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
    dateSchedules?: Prisma.DoctorDateScheduleListRelationFilter;
    blockedTimes?: Prisma.BlockedTimeListRelationFilter;
    appointments?: Prisma.AppointmentListRelationFilter;
}, "id" | "userId" | "phone">;
export type DoctorProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    specialtyId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DoctorProfileCountOrderByAggregateInput;
    _avg?: Prisma.DoctorProfileAvgOrderByAggregateInput;
    _max?: Prisma.DoctorProfileMaxOrderByAggregateInput;
    _min?: Prisma.DoctorProfileMinOrderByAggregateInput;
    _sum?: Prisma.DoctorProfileSumOrderByAggregateInput;
};
export type DoctorProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.DoctorProfileScalarWhereWithAggregatesInput | Prisma.DoctorProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.DoctorProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DoctorProfileScalarWhereWithAggregatesInput | Prisma.DoctorProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DoctorProfile"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"DoctorProfile"> | string;
    specialtyId?: Prisma.UuidWithAggregatesFilter<"DoctorProfile"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"DoctorProfile"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null;
    bio?: Prisma.StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null;
    experienceYears?: Prisma.IntWithAggregatesFilter<"DoctorProfile"> | number;
    avatarUrl?: Prisma.StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DoctorProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DoctorProfile"> | Date | string;
};
export type DoctorProfileCreateInput = {
    id?: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    specialty: Prisma.SpecialtyCreateNestedOneWithoutDoctorsInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    specialtyId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDoctorProfileNestedInput;
    specialty?: Prisma.SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    specialtyId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileCreateManyInput = {
    id?: string;
    userId: string;
    specialtyId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    specialtyId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorProfileNullableScalarRelationFilter = {
    is?: Prisma.DoctorProfileWhereInput | null;
    isNot?: Prisma.DoctorProfileWhereInput | null;
};
export type DoctorProfileListRelationFilter = {
    every?: Prisma.DoctorProfileWhereInput;
    some?: Prisma.DoctorProfileWhereInput;
    none?: Prisma.DoctorProfileWhereInput;
};
export type DoctorProfileOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DoctorProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    specialtyId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorProfileAvgOrderByAggregateInput = {
    experienceYears?: Prisma.SortOrder;
};
export type DoctorProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    specialtyId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    specialtyId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorProfileSumOrderByAggregateInput = {
    experienceYears?: Prisma.SortOrder;
};
export type DoctorProfileScalarRelationFilter = {
    is?: Prisma.DoctorProfileWhereInput;
    isNot?: Prisma.DoctorProfileWhereInput;
};
export type DoctorProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutUserInput, Prisma.DoctorProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
};
export type DoctorProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutUserInput, Prisma.DoctorProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
};
export type DoctorProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutUserInput, Prisma.DoctorProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DoctorProfileUpsertWithoutUserInput;
    disconnect?: Prisma.DoctorProfileWhereInput | boolean;
    delete?: Prisma.DoctorProfileWhereInput | boolean;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorProfileUpdateToOneWithWhereWithoutUserInput, Prisma.DoctorProfileUpdateWithoutUserInput>, Prisma.DoctorProfileUncheckedUpdateWithoutUserInput>;
};
export type DoctorProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutUserInput, Prisma.DoctorProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DoctorProfileUpsertWithoutUserInput;
    disconnect?: Prisma.DoctorProfileWhereInput | boolean;
    delete?: Prisma.DoctorProfileWhereInput | boolean;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorProfileUpdateToOneWithWhereWithoutUserInput, Prisma.DoctorProfileUpdateWithoutUserInput>, Prisma.DoctorProfileUncheckedUpdateWithoutUserInput>;
};
export type DoctorProfileCreateNestedManyWithoutSpecialtyInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput> | Prisma.DoctorProfileCreateWithoutSpecialtyInput[] | Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput[];
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput | Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput[];
    createMany?: Prisma.DoctorProfileCreateManySpecialtyInputEnvelope;
    connect?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
};
export type DoctorProfileUncheckedCreateNestedManyWithoutSpecialtyInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput> | Prisma.DoctorProfileCreateWithoutSpecialtyInput[] | Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput[];
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput | Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput[];
    createMany?: Prisma.DoctorProfileCreateManySpecialtyInputEnvelope;
    connect?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
};
export type DoctorProfileUpdateManyWithoutSpecialtyNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput> | Prisma.DoctorProfileCreateWithoutSpecialtyInput[] | Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput[];
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput | Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput[];
    upsert?: Prisma.DoctorProfileUpsertWithWhereUniqueWithoutSpecialtyInput | Prisma.DoctorProfileUpsertWithWhereUniqueWithoutSpecialtyInput[];
    createMany?: Prisma.DoctorProfileCreateManySpecialtyInputEnvelope;
    set?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    disconnect?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    delete?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    connect?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    update?: Prisma.DoctorProfileUpdateWithWhereUniqueWithoutSpecialtyInput | Prisma.DoctorProfileUpdateWithWhereUniqueWithoutSpecialtyInput[];
    updateMany?: Prisma.DoctorProfileUpdateManyWithWhereWithoutSpecialtyInput | Prisma.DoctorProfileUpdateManyWithWhereWithoutSpecialtyInput[];
    deleteMany?: Prisma.DoctorProfileScalarWhereInput | Prisma.DoctorProfileScalarWhereInput[];
};
export type DoctorProfileUncheckedUpdateManyWithoutSpecialtyNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput> | Prisma.DoctorProfileCreateWithoutSpecialtyInput[] | Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput[];
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput | Prisma.DoctorProfileCreateOrConnectWithoutSpecialtyInput[];
    upsert?: Prisma.DoctorProfileUpsertWithWhereUniqueWithoutSpecialtyInput | Prisma.DoctorProfileUpsertWithWhereUniqueWithoutSpecialtyInput[];
    createMany?: Prisma.DoctorProfileCreateManySpecialtyInputEnvelope;
    set?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    disconnect?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    delete?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    connect?: Prisma.DoctorProfileWhereUniqueInput | Prisma.DoctorProfileWhereUniqueInput[];
    update?: Prisma.DoctorProfileUpdateWithWhereUniqueWithoutSpecialtyInput | Prisma.DoctorProfileUpdateWithWhereUniqueWithoutSpecialtyInput[];
    updateMany?: Prisma.DoctorProfileUpdateManyWithWhereWithoutSpecialtyInput | Prisma.DoctorProfileUpdateManyWithWhereWithoutSpecialtyInput[];
    deleteMany?: Prisma.DoctorProfileScalarWhereInput | Prisma.DoctorProfileScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DoctorProfileCreateNestedOneWithoutSchedulesInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutSchedulesInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
};
export type DoctorProfileUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutSchedulesInput;
    upsert?: Prisma.DoctorProfileUpsertWithoutSchedulesInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorProfileUpdateToOneWithWhereWithoutSchedulesInput, Prisma.DoctorProfileUpdateWithoutSchedulesInput>, Prisma.DoctorProfileUncheckedUpdateWithoutSchedulesInput>;
};
export type DoctorProfileCreateNestedOneWithoutDateSchedulesInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutDateSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutDateSchedulesInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutDateSchedulesInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
};
export type DoctorProfileUpdateOneRequiredWithoutDateSchedulesNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutDateSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutDateSchedulesInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutDateSchedulesInput;
    upsert?: Prisma.DoctorProfileUpsertWithoutDateSchedulesInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorProfileUpdateToOneWithWhereWithoutDateSchedulesInput, Prisma.DoctorProfileUpdateWithoutDateSchedulesInput>, Prisma.DoctorProfileUncheckedUpdateWithoutDateSchedulesInput>;
};
export type DoctorProfileCreateNestedOneWithoutBlockedTimesInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutBlockedTimesInput, Prisma.DoctorProfileUncheckedCreateWithoutBlockedTimesInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutBlockedTimesInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
};
export type DoctorProfileUpdateOneRequiredWithoutBlockedTimesNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutBlockedTimesInput, Prisma.DoctorProfileUncheckedCreateWithoutBlockedTimesInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutBlockedTimesInput;
    upsert?: Prisma.DoctorProfileUpsertWithoutBlockedTimesInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorProfileUpdateToOneWithWhereWithoutBlockedTimesInput, Prisma.DoctorProfileUpdateWithoutBlockedTimesInput>, Prisma.DoctorProfileUncheckedUpdateWithoutBlockedTimesInput>;
};
export type DoctorProfileCreateNestedOneWithoutAppointmentsInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutAppointmentsInput, Prisma.DoctorProfileUncheckedCreateWithoutAppointmentsInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutAppointmentsInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
};
export type DoctorProfileUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorProfileCreateWithoutAppointmentsInput, Prisma.DoctorProfileUncheckedCreateWithoutAppointmentsInput>;
    connectOrCreate?: Prisma.DoctorProfileCreateOrConnectWithoutAppointmentsInput;
    upsert?: Prisma.DoctorProfileUpsertWithoutAppointmentsInput;
    connect?: Prisma.DoctorProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorProfileUpdateToOneWithWhereWithoutAppointmentsInput, Prisma.DoctorProfileUpdateWithoutAppointmentsInput>, Prisma.DoctorProfileUncheckedUpdateWithoutAppointmentsInput>;
};
export type DoctorProfileCreateWithoutUserInput = {
    id?: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    specialty: Prisma.SpecialtyCreateNestedOneWithoutDoctorsInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    specialtyId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutUserInput, Prisma.DoctorProfileUncheckedCreateWithoutUserInput>;
};
export type DoctorProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutUserInput, Prisma.DoctorProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutUserInput, Prisma.DoctorProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.DoctorProfileWhereInput;
};
export type DoctorProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.DoctorProfileWhereInput;
    data: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutUserInput, Prisma.DoctorProfileUncheckedUpdateWithoutUserInput>;
};
export type DoctorProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    specialty?: Prisma.SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    specialtyId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileCreateWithoutSpecialtyInput = {
    id?: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUncheckedCreateWithoutSpecialtyInput = {
    id?: string;
    userId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileCreateOrConnectWithoutSpecialtyInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput>;
};
export type DoctorProfileCreateManySpecialtyInputEnvelope = {
    data: Prisma.DoctorProfileCreateManySpecialtyInput | Prisma.DoctorProfileCreateManySpecialtyInput[];
    skipDuplicates?: boolean;
};
export type DoctorProfileUpsertWithWhereUniqueWithoutSpecialtyInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    update: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedUpdateWithoutSpecialtyInput>;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedCreateWithoutSpecialtyInput>;
};
export type DoctorProfileUpdateWithWhereUniqueWithoutSpecialtyInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    data: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutSpecialtyInput, Prisma.DoctorProfileUncheckedUpdateWithoutSpecialtyInput>;
};
export type DoctorProfileUpdateManyWithWhereWithoutSpecialtyInput = {
    where: Prisma.DoctorProfileScalarWhereInput;
    data: Prisma.XOR<Prisma.DoctorProfileUpdateManyMutationInput, Prisma.DoctorProfileUncheckedUpdateManyWithoutSpecialtyInput>;
};
export type DoctorProfileScalarWhereInput = {
    AND?: Prisma.DoctorProfileScalarWhereInput | Prisma.DoctorProfileScalarWhereInput[];
    OR?: Prisma.DoctorProfileScalarWhereInput[];
    NOT?: Prisma.DoctorProfileScalarWhereInput | Prisma.DoctorProfileScalarWhereInput[];
    id?: Prisma.UuidFilter<"DoctorProfile"> | string;
    userId?: Prisma.UuidFilter<"DoctorProfile"> | string;
    specialtyId?: Prisma.UuidFilter<"DoctorProfile"> | string;
    fullName?: Prisma.StringFilter<"DoctorProfile"> | string;
    phone?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    bio?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    experienceYears?: Prisma.IntFilter<"DoctorProfile"> | number;
    avatarUrl?: Prisma.StringNullableFilter<"DoctorProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorProfile"> | Date | string;
};
export type DoctorProfileCreateWithoutSchedulesInput = {
    id?: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    specialty: Prisma.SpecialtyCreateNestedOneWithoutDoctorsInput;
    dateSchedules?: Prisma.DoctorDateScheduleCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUncheckedCreateWithoutSchedulesInput = {
    id?: string;
    userId: string;
    specialtyId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileCreateOrConnectWithoutSchedulesInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutSchedulesInput>;
};
export type DoctorProfileUpsertWithoutSchedulesInput = {
    update: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutSchedulesInput, Prisma.DoctorProfileUncheckedUpdateWithoutSchedulesInput>;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutSchedulesInput>;
    where?: Prisma.DoctorProfileWhereInput;
};
export type DoctorProfileUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: Prisma.DoctorProfileWhereInput;
    data: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutSchedulesInput, Prisma.DoctorProfileUncheckedUpdateWithoutSchedulesInput>;
};
export type DoctorProfileUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDoctorProfileNestedInput;
    specialty?: Prisma.SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    specialtyId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileCreateWithoutDateSchedulesInput = {
    id?: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    specialty: Prisma.SpecialtyCreateNestedOneWithoutDoctorsInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUncheckedCreateWithoutDateSchedulesInput = {
    id?: string;
    userId: string;
    specialtyId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileCreateOrConnectWithoutDateSchedulesInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutDateSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutDateSchedulesInput>;
};
export type DoctorProfileUpsertWithoutDateSchedulesInput = {
    update: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutDateSchedulesInput, Prisma.DoctorProfileUncheckedUpdateWithoutDateSchedulesInput>;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutDateSchedulesInput, Prisma.DoctorProfileUncheckedCreateWithoutDateSchedulesInput>;
    where?: Prisma.DoctorProfileWhereInput;
};
export type DoctorProfileUpdateToOneWithWhereWithoutDateSchedulesInput = {
    where?: Prisma.DoctorProfileWhereInput;
    data: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutDateSchedulesInput, Prisma.DoctorProfileUncheckedUpdateWithoutDateSchedulesInput>;
};
export type DoctorProfileUpdateWithoutDateSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDoctorProfileNestedInput;
    specialty?: Prisma.SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateWithoutDateSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    specialtyId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileCreateWithoutBlockedTimesInput = {
    id?: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    specialty: Prisma.SpecialtyCreateNestedOneWithoutDoctorsInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUncheckedCreateWithoutBlockedTimesInput = {
    id?: string;
    userId: string;
    specialtyId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileCreateOrConnectWithoutBlockedTimesInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutBlockedTimesInput, Prisma.DoctorProfileUncheckedCreateWithoutBlockedTimesInput>;
};
export type DoctorProfileUpsertWithoutBlockedTimesInput = {
    update: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutBlockedTimesInput, Prisma.DoctorProfileUncheckedUpdateWithoutBlockedTimesInput>;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutBlockedTimesInput, Prisma.DoctorProfileUncheckedCreateWithoutBlockedTimesInput>;
    where?: Prisma.DoctorProfileWhereInput;
};
export type DoctorProfileUpdateToOneWithWhereWithoutBlockedTimesInput = {
    where?: Prisma.DoctorProfileWhereInput;
    data: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutBlockedTimesInput, Prisma.DoctorProfileUncheckedUpdateWithoutBlockedTimesInput>;
};
export type DoctorProfileUpdateWithoutBlockedTimesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDoctorProfileNestedInput;
    specialty?: Prisma.SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateWithoutBlockedTimesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    specialtyId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileCreateWithoutAppointmentsInput = {
    id?: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    specialty: Prisma.SpecialtyCreateNestedOneWithoutDoctorsInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileUncheckedCreateWithoutAppointmentsInput = {
    id?: string;
    userId: string;
    specialtyId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorProfileCreateOrConnectWithoutAppointmentsInput = {
    where: Prisma.DoctorProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutAppointmentsInput, Prisma.DoctorProfileUncheckedCreateWithoutAppointmentsInput>;
};
export type DoctorProfileUpsertWithoutAppointmentsInput = {
    update: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutAppointmentsInput, Prisma.DoctorProfileUncheckedUpdateWithoutAppointmentsInput>;
    create: Prisma.XOR<Prisma.DoctorProfileCreateWithoutAppointmentsInput, Prisma.DoctorProfileUncheckedCreateWithoutAppointmentsInput>;
    where?: Prisma.DoctorProfileWhereInput;
};
export type DoctorProfileUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: Prisma.DoctorProfileWhereInput;
    data: Prisma.XOR<Prisma.DoctorProfileUpdateWithoutAppointmentsInput, Prisma.DoctorProfileUncheckedUpdateWithoutAppointmentsInput>;
};
export type DoctorProfileUpdateWithoutAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDoctorProfileNestedInput;
    specialty?: Prisma.SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateWithoutAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    specialtyId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileCreateManySpecialtyInput = {
    id?: string;
    userId: string;
    fullName: string;
    phone?: string | null;
    bio?: string | null;
    experienceYears?: number;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorProfileUpdateWithoutSpecialtyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDoctorProfileNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateWithoutSpecialtyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    dateSchedules?: Prisma.DoctorDateScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    blockedTimes?: Prisma.BlockedTimeUncheckedUpdateManyWithoutDoctorNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorProfileUncheckedUpdateManyWithoutSpecialtyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type DoctorProfileCountOutputType
 */
export type DoctorProfileCountOutputType = {
    schedules: number;
    dateSchedules: number;
    blockedTimes: number;
    appointments: number;
};
export type DoctorProfileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    schedules?: boolean | DoctorProfileCountOutputTypeCountSchedulesArgs;
    dateSchedules?: boolean | DoctorProfileCountOutputTypeCountDateSchedulesArgs;
    blockedTimes?: boolean | DoctorProfileCountOutputTypeCountBlockedTimesArgs;
    appointments?: boolean | DoctorProfileCountOutputTypeCountAppointmentsArgs;
};
/**
 * DoctorProfileCountOutputType without action
 */
export type DoctorProfileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfileCountOutputType
     */
    select?: Prisma.DoctorProfileCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DoctorProfileCountOutputType without action
 */
export type DoctorProfileCountOutputTypeCountSchedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorScheduleWhereInput;
};
/**
 * DoctorProfileCountOutputType without action
 */
export type DoctorProfileCountOutputTypeCountDateSchedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorDateScheduleWhereInput;
};
/**
 * DoctorProfileCountOutputType without action
 */
export type DoctorProfileCountOutputTypeCountBlockedTimesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlockedTimeWhereInput;
};
/**
 * DoctorProfileCountOutputType without action
 */
export type DoctorProfileCountOutputTypeCountAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
};
export type DoctorProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    specialtyId?: boolean;
    fullName?: boolean;
    phone?: boolean;
    bio?: boolean;
    experienceYears?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    specialty?: boolean | Prisma.SpecialtyDefaultArgs<ExtArgs>;
    schedules?: boolean | Prisma.DoctorProfile$schedulesArgs<ExtArgs>;
    dateSchedules?: boolean | Prisma.DoctorProfile$dateSchedulesArgs<ExtArgs>;
    blockedTimes?: boolean | Prisma.DoctorProfile$blockedTimesArgs<ExtArgs>;
    appointments?: boolean | Prisma.DoctorProfile$appointmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.DoctorProfileCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorProfile"]>;
export type DoctorProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    specialtyId?: boolean;
    fullName?: boolean;
    phone?: boolean;
    bio?: boolean;
    experienceYears?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    specialty?: boolean | Prisma.SpecialtyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorProfile"]>;
export type DoctorProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    specialtyId?: boolean;
    fullName?: boolean;
    phone?: boolean;
    bio?: boolean;
    experienceYears?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    specialty?: boolean | Prisma.SpecialtyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorProfile"]>;
export type DoctorProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    specialtyId?: boolean;
    fullName?: boolean;
    phone?: boolean;
    bio?: boolean;
    experienceYears?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DoctorProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "specialtyId" | "fullName" | "phone" | "bio" | "experienceYears" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["doctorProfile"]>;
export type DoctorProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    specialty?: boolean | Prisma.SpecialtyDefaultArgs<ExtArgs>;
    schedules?: boolean | Prisma.DoctorProfile$schedulesArgs<ExtArgs>;
    dateSchedules?: boolean | Prisma.DoctorProfile$dateSchedulesArgs<ExtArgs>;
    blockedTimes?: boolean | Prisma.DoctorProfile$blockedTimesArgs<ExtArgs>;
    appointments?: boolean | Prisma.DoctorProfile$appointmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.DoctorProfileCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DoctorProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    specialty?: boolean | Prisma.SpecialtyDefaultArgs<ExtArgs>;
};
export type DoctorProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    specialty?: boolean | Prisma.SpecialtyDefaultArgs<ExtArgs>;
};
export type $DoctorProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DoctorProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        specialty: Prisma.$SpecialtyPayload<ExtArgs>;
        schedules: Prisma.$DoctorSchedulePayload<ExtArgs>[];
        dateSchedules: Prisma.$DoctorDateSchedulePayload<ExtArgs>[];
        blockedTimes: Prisma.$BlockedTimePayload<ExtArgs>[];
        appointments: Prisma.$AppointmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        specialtyId: string;
        fullName: string;
        phone: string | null;
        bio: string | null;
        experienceYears: number;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["doctorProfile"]>;
    composites: {};
};
export type DoctorProfileGetPayload<S extends boolean | null | undefined | DoctorProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload, S>;
export type DoctorProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DoctorProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DoctorProfileCountAggregateInputType | true;
};
export interface DoctorProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DoctorProfile'];
        meta: {
            name: 'DoctorProfile';
        };
    };
    /**
     * Find zero or one DoctorProfile that matches the filter.
     * @param {DoctorProfileFindUniqueArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, DoctorProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DoctorProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorProfileFindUniqueOrThrowArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DoctorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DoctorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileFindFirstArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, DoctorProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DoctorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileFindFirstOrThrowArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DoctorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DoctorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorProfiles
     * const doctorProfiles = await prisma.doctorProfile.findMany()
     *
     * // Get first 10 DoctorProfiles
     * const doctorProfiles = await prisma.doctorProfile.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const doctorProfileWithIdOnly = await prisma.doctorProfile.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DoctorProfileFindManyArgs>(args?: Prisma.SelectSubset<T, DoctorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DoctorProfile.
     * @param {DoctorProfileCreateArgs} args - Arguments to create a DoctorProfile.
     * @example
     * // Create one DoctorProfile
     * const DoctorProfile = await prisma.doctorProfile.create({
     *   data: {
     *     // ... data to create a DoctorProfile
     *   }
     * })
     *
     */
    create<T extends DoctorProfileCreateArgs>(args: Prisma.SelectSubset<T, DoctorProfileCreateArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DoctorProfiles.
     * @param {DoctorProfileCreateManyArgs} args - Arguments to create many DoctorProfiles.
     * @example
     * // Create many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DoctorProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, DoctorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DoctorProfiles and returns the data saved in the database.
     * @param {DoctorProfileCreateManyAndReturnArgs} args - Arguments to create many DoctorProfiles.
     * @example
     * // Create many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DoctorProfiles and only return the `id`
     * const doctorProfileWithIdOnly = await prisma.doctorProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DoctorProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DoctorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DoctorProfile.
     * @param {DoctorProfileDeleteArgs} args - Arguments to delete one DoctorProfile.
     * @example
     * // Delete one DoctorProfile
     * const DoctorProfile = await prisma.doctorProfile.delete({
     *   where: {
     *     // ... filter to delete one DoctorProfile
     *   }
     * })
     *
     */
    delete<T extends DoctorProfileDeleteArgs>(args: Prisma.SelectSubset<T, DoctorProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DoctorProfile.
     * @param {DoctorProfileUpdateArgs} args - Arguments to update one DoctorProfile.
     * @example
     * // Update one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DoctorProfileUpdateArgs>(args: Prisma.SelectSubset<T, DoctorProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DoctorProfiles.
     * @param {DoctorProfileDeleteManyArgs} args - Arguments to filter DoctorProfiles to delete.
     * @example
     * // Delete a few DoctorProfiles
     * const { count } = await prisma.doctorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DoctorProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, DoctorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DoctorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DoctorProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, DoctorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DoctorProfiles and returns the data updated in the database.
     * @param {DoctorProfileUpdateManyAndReturnArgs} args - Arguments to update many DoctorProfiles.
     * @example
     * // Update many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DoctorProfiles and only return the `id`
     * const doctorProfileWithIdOnly = await prisma.doctorProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DoctorProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DoctorProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DoctorProfile.
     * @param {DoctorProfileUpsertArgs} args - Arguments to update or create a DoctorProfile.
     * @example
     * // Update or create a DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.upsert({
     *   create: {
     *     // ... data to create a DoctorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorProfile we want to update
     *   }
     * })
     */
    upsert<T extends DoctorProfileUpsertArgs>(args: Prisma.SelectSubset<T, DoctorProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DoctorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileCountArgs} args - Arguments to filter DoctorProfiles to count.
     * @example
     * // Count the number of DoctorProfiles
     * const count = await prisma.doctorProfile.count({
     *   where: {
     *     // ... the filter for the DoctorProfiles we want to count
     *   }
     * })
    **/
    count<T extends DoctorProfileCountArgs>(args?: Prisma.Subset<T, DoctorProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DoctorProfileCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DoctorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorProfileAggregateArgs>(args: Prisma.Subset<T, DoctorProfileAggregateArgs>): Prisma.PrismaPromise<GetDoctorProfileAggregateType<T>>;
    /**
     * Group by DoctorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends DoctorProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DoctorProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: DoctorProfileGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DoctorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DoctorProfile model
     */
    readonly fields: DoctorProfileFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DoctorProfile.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DoctorProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    specialty<T extends Prisma.SpecialtyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SpecialtyDefaultArgs<ExtArgs>>): Prisma.Prisma__SpecialtyClient<runtime.Types.Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    schedules<T extends Prisma.DoctorProfile$schedulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorProfile$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    dateSchedules<T extends Prisma.DoctorProfile$dateSchedulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorProfile$dateSchedulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    blockedTimes<T extends Prisma.DoctorProfile$blockedTimesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorProfile$blockedTimesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlockedTimePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    appointments<T extends Prisma.DoctorProfile$appointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorProfile$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the DoctorProfile model
 */
export interface DoctorProfileFieldRefs {
    readonly id: Prisma.FieldRef<"DoctorProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"DoctorProfile", 'String'>;
    readonly specialtyId: Prisma.FieldRef<"DoctorProfile", 'String'>;
    readonly fullName: Prisma.FieldRef<"DoctorProfile", 'String'>;
    readonly phone: Prisma.FieldRef<"DoctorProfile", 'String'>;
    readonly bio: Prisma.FieldRef<"DoctorProfile", 'String'>;
    readonly experienceYears: Prisma.FieldRef<"DoctorProfile", 'Int'>;
    readonly avatarUrl: Prisma.FieldRef<"DoctorProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DoctorProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DoctorProfile", 'DateTime'>;
}
/**
 * DoctorProfile findUnique
 */
export type DoctorProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where: Prisma.DoctorProfileWhereUniqueInput;
};
/**
 * DoctorProfile findUniqueOrThrow
 */
export type DoctorProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where: Prisma.DoctorProfileWhereUniqueInput;
};
/**
 * DoctorProfile findFirst
 */
export type DoctorProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where?: Prisma.DoctorProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: Prisma.DoctorProfileOrderByWithRelationInput | Prisma.DoctorProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DoctorProfiles.
     */
    cursor?: Prisma.DoctorProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorProfiles.
     */
    distinct?: Prisma.DoctorProfileScalarFieldEnum | Prisma.DoctorProfileScalarFieldEnum[];
};
/**
 * DoctorProfile findFirstOrThrow
 */
export type DoctorProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where?: Prisma.DoctorProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: Prisma.DoctorProfileOrderByWithRelationInput | Prisma.DoctorProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DoctorProfiles.
     */
    cursor?: Prisma.DoctorProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorProfiles.
     */
    distinct?: Prisma.DoctorProfileScalarFieldEnum | Prisma.DoctorProfileScalarFieldEnum[];
};
/**
 * DoctorProfile findMany
 */
export type DoctorProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorProfiles to fetch.
     */
    where?: Prisma.DoctorProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: Prisma.DoctorProfileOrderByWithRelationInput | Prisma.DoctorProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DoctorProfiles.
     */
    cursor?: Prisma.DoctorProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorProfiles.
     */
    distinct?: Prisma.DoctorProfileScalarFieldEnum | Prisma.DoctorProfileScalarFieldEnum[];
};
/**
 * DoctorProfile create
 */
export type DoctorProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * The data needed to create a DoctorProfile.
     */
    data: Prisma.XOR<Prisma.DoctorProfileCreateInput, Prisma.DoctorProfileUncheckedCreateInput>;
};
/**
 * DoctorProfile createMany
 */
export type DoctorProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorProfiles.
     */
    data: Prisma.DoctorProfileCreateManyInput | Prisma.DoctorProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DoctorProfile createManyAndReturn
 */
export type DoctorProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * The data used to create many DoctorProfiles.
     */
    data: Prisma.DoctorProfileCreateManyInput | Prisma.DoctorProfileCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DoctorProfile update
 */
export type DoctorProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * The data needed to update a DoctorProfile.
     */
    data: Prisma.XOR<Prisma.DoctorProfileUpdateInput, Prisma.DoctorProfileUncheckedUpdateInput>;
    /**
     * Choose, which DoctorProfile to update.
     */
    where: Prisma.DoctorProfileWhereUniqueInput;
};
/**
 * DoctorProfile updateMany
 */
export type DoctorProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorProfiles.
     */
    data: Prisma.XOR<Prisma.DoctorProfileUpdateManyMutationInput, Prisma.DoctorProfileUncheckedUpdateManyInput>;
    /**
     * Filter which DoctorProfiles to update
     */
    where?: Prisma.DoctorProfileWhereInput;
    /**
     * Limit how many DoctorProfiles to update.
     */
    limit?: number;
};
/**
 * DoctorProfile updateManyAndReturn
 */
export type DoctorProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * The data used to update DoctorProfiles.
     */
    data: Prisma.XOR<Prisma.DoctorProfileUpdateManyMutationInput, Prisma.DoctorProfileUncheckedUpdateManyInput>;
    /**
     * Filter which DoctorProfiles to update
     */
    where?: Prisma.DoctorProfileWhereInput;
    /**
     * Limit how many DoctorProfiles to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DoctorProfile upsert
 */
export type DoctorProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * The filter to search for the DoctorProfile to update in case it exists.
     */
    where: Prisma.DoctorProfileWhereUniqueInput;
    /**
     * In case the DoctorProfile found by the `where` argument doesn't exist, create a new DoctorProfile with this data.
     */
    create: Prisma.XOR<Prisma.DoctorProfileCreateInput, Prisma.DoctorProfileUncheckedCreateInput>;
    /**
     * In case the DoctorProfile was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DoctorProfileUpdateInput, Prisma.DoctorProfileUncheckedUpdateInput>;
};
/**
 * DoctorProfile delete
 */
export type DoctorProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
    /**
     * Filter which DoctorProfile to delete.
     */
    where: Prisma.DoctorProfileWhereUniqueInput;
};
/**
 * DoctorProfile deleteMany
 */
export type DoctorProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorProfiles to delete
     */
    where?: Prisma.DoctorProfileWhereInput;
    /**
     * Limit how many DoctorProfiles to delete.
     */
    limit?: number;
};
/**
 * DoctorProfile.schedules
 */
export type DoctorProfile$schedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: Prisma.DoctorScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: Prisma.DoctorScheduleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorScheduleInclude<ExtArgs> | null;
    where?: Prisma.DoctorScheduleWhereInput;
    orderBy?: Prisma.DoctorScheduleOrderByWithRelationInput | Prisma.DoctorScheduleOrderByWithRelationInput[];
    cursor?: Prisma.DoctorScheduleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DoctorScheduleScalarFieldEnum | Prisma.DoctorScheduleScalarFieldEnum[];
};
/**
 * DoctorProfile.dateSchedules
 */
export type DoctorProfile$dateSchedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorDateSchedule
     */
    select?: Prisma.DoctorDateScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorDateSchedule
     */
    omit?: Prisma.DoctorDateScheduleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorDateScheduleInclude<ExtArgs> | null;
    where?: Prisma.DoctorDateScheduleWhereInput;
    orderBy?: Prisma.DoctorDateScheduleOrderByWithRelationInput | Prisma.DoctorDateScheduleOrderByWithRelationInput[];
    cursor?: Prisma.DoctorDateScheduleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DoctorDateScheduleScalarFieldEnum | Prisma.DoctorDateScheduleScalarFieldEnum[];
};
/**
 * DoctorProfile.blockedTimes
 */
export type DoctorProfile$blockedTimesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedTime
     */
    select?: Prisma.BlockedTimeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BlockedTime
     */
    omit?: Prisma.BlockedTimeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BlockedTimeInclude<ExtArgs> | null;
    where?: Prisma.BlockedTimeWhereInput;
    orderBy?: Prisma.BlockedTimeOrderByWithRelationInput | Prisma.BlockedTimeOrderByWithRelationInput[];
    cursor?: Prisma.BlockedTimeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlockedTimeScalarFieldEnum | Prisma.BlockedTimeScalarFieldEnum[];
};
/**
 * DoctorProfile.appointments
 */
export type DoctorProfile$appointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Appointment
     */
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
/**
 * DoctorProfile without action
 */
export type DoctorProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: Prisma.DoctorProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: Prisma.DoctorProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorProfileInclude<ExtArgs> | null;
};
//# sourceMappingURL=DoctorProfile.d.ts.map