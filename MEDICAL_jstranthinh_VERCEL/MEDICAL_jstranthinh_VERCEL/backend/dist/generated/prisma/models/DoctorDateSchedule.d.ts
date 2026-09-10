import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model DoctorDateSchedule
 *
 */
export type DoctorDateScheduleModel = runtime.Types.Result.DefaultSelection<Prisma.$DoctorDateSchedulePayload>;
export type AggregateDoctorDateSchedule = {
    _count: DoctorDateScheduleCountAggregateOutputType | null;
    _avg: DoctorDateScheduleAvgAggregateOutputType | null;
    _sum: DoctorDateScheduleSumAggregateOutputType | null;
    _min: DoctorDateScheduleMinAggregateOutputType | null;
    _max: DoctorDateScheduleMaxAggregateOutputType | null;
};
export type DoctorDateScheduleAvgAggregateOutputType = {
    startMinute: number | null;
    endMinute: number | null;
    slotMinutes: number | null;
};
export type DoctorDateScheduleSumAggregateOutputType = {
    startMinute: number | null;
    endMinute: number | null;
    slotMinutes: number | null;
};
export type DoctorDateScheduleMinAggregateOutputType = {
    id: string | null;
    doctorId: string | null;
    workDate: Date | null;
    startMinute: number | null;
    endMinute: number | null;
    slotMinutes: number | null;
    isActive: boolean | null;
    note: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorDateScheduleMaxAggregateOutputType = {
    id: string | null;
    doctorId: string | null;
    workDate: Date | null;
    startMinute: number | null;
    endMinute: number | null;
    slotMinutes: number | null;
    isActive: boolean | null;
    note: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorDateScheduleCountAggregateOutputType = {
    id: number;
    doctorId: number;
    workDate: number;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
    isActive: number;
    note: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DoctorDateScheduleAvgAggregateInputType = {
    startMinute?: true;
    endMinute?: true;
    slotMinutes?: true;
};
export type DoctorDateScheduleSumAggregateInputType = {
    startMinute?: true;
    endMinute?: true;
    slotMinutes?: true;
};
export type DoctorDateScheduleMinAggregateInputType = {
    id?: true;
    doctorId?: true;
    workDate?: true;
    startMinute?: true;
    endMinute?: true;
    slotMinutes?: true;
    isActive?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorDateScheduleMaxAggregateInputType = {
    id?: true;
    doctorId?: true;
    workDate?: true;
    startMinute?: true;
    endMinute?: true;
    slotMinutes?: true;
    isActive?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorDateScheduleCountAggregateInputType = {
    id?: true;
    doctorId?: true;
    workDate?: true;
    startMinute?: true;
    endMinute?: true;
    slotMinutes?: true;
    isActive?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DoctorDateScheduleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorDateSchedule to aggregate.
     */
    where?: Prisma.DoctorDateScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorDateSchedules to fetch.
     */
    orderBy?: Prisma.DoctorDateScheduleOrderByWithRelationInput | Prisma.DoctorDateScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DoctorDateScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorDateSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorDateSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DoctorDateSchedules
    **/
    _count?: true | DoctorDateScheduleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DoctorDateScheduleAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DoctorDateScheduleSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DoctorDateScheduleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DoctorDateScheduleMaxAggregateInputType;
};
export type GetDoctorDateScheduleAggregateType<T extends DoctorDateScheduleAggregateArgs> = {
    [P in keyof T & keyof AggregateDoctorDateSchedule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDoctorDateSchedule[P]> : Prisma.GetScalarType<T[P], AggregateDoctorDateSchedule[P]>;
};
export type DoctorDateScheduleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorDateScheduleWhereInput;
    orderBy?: Prisma.DoctorDateScheduleOrderByWithAggregationInput | Prisma.DoctorDateScheduleOrderByWithAggregationInput[];
    by: Prisma.DoctorDateScheduleScalarFieldEnum[] | Prisma.DoctorDateScheduleScalarFieldEnum;
    having?: Prisma.DoctorDateScheduleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DoctorDateScheduleCountAggregateInputType | true;
    _avg?: DoctorDateScheduleAvgAggregateInputType;
    _sum?: DoctorDateScheduleSumAggregateInputType;
    _min?: DoctorDateScheduleMinAggregateInputType;
    _max?: DoctorDateScheduleMaxAggregateInputType;
};
export type DoctorDateScheduleGroupByOutputType = {
    id: string;
    doctorId: string;
    workDate: Date;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
    isActive: boolean;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DoctorDateScheduleCountAggregateOutputType | null;
    _avg: DoctorDateScheduleAvgAggregateOutputType | null;
    _sum: DoctorDateScheduleSumAggregateOutputType | null;
    _min: DoctorDateScheduleMinAggregateOutputType | null;
    _max: DoctorDateScheduleMaxAggregateOutputType | null;
};
export type GetDoctorDateScheduleGroupByPayload<T extends DoctorDateScheduleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DoctorDateScheduleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DoctorDateScheduleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DoctorDateScheduleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DoctorDateScheduleGroupByOutputType[P]>;
}>>;
export type DoctorDateScheduleWhereInput = {
    AND?: Prisma.DoctorDateScheduleWhereInput | Prisma.DoctorDateScheduleWhereInput[];
    OR?: Prisma.DoctorDateScheduleWhereInput[];
    NOT?: Prisma.DoctorDateScheduleWhereInput | Prisma.DoctorDateScheduleWhereInput[];
    id?: Prisma.UuidFilter<"DoctorDateSchedule"> | string;
    doctorId?: Prisma.UuidFilter<"DoctorDateSchedule"> | string;
    workDate?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    startMinute?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    endMinute?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    slotMinutes?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    isActive?: Prisma.BoolFilter<"DoctorDateSchedule"> | boolean;
    note?: Prisma.StringNullableFilter<"DoctorDateSchedule"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorProfileScalarRelationFilter, Prisma.DoctorProfileWhereInput>;
};
export type DoctorDateScheduleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startMinute?: Prisma.SortOrder;
    endMinute?: Prisma.SortOrder;
    slotMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    doctor?: Prisma.DoctorProfileOrderByWithRelationInput;
};
export type DoctorDateScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    doctorId_workDate_startMinute_endMinute?: Prisma.DoctorDateScheduleDoctorIdWorkDateStartMinuteEndMinuteCompoundUniqueInput;
    AND?: Prisma.DoctorDateScheduleWhereInput | Prisma.DoctorDateScheduleWhereInput[];
    OR?: Prisma.DoctorDateScheduleWhereInput[];
    NOT?: Prisma.DoctorDateScheduleWhereInput | Prisma.DoctorDateScheduleWhereInput[];
    doctorId?: Prisma.UuidFilter<"DoctorDateSchedule"> | string;
    workDate?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    startMinute?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    endMinute?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    slotMinutes?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    isActive?: Prisma.BoolFilter<"DoctorDateSchedule"> | boolean;
    note?: Prisma.StringNullableFilter<"DoctorDateSchedule"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorProfileScalarRelationFilter, Prisma.DoctorProfileWhereInput>;
}, "id" | "doctorId_workDate_startMinute_endMinute">;
export type DoctorDateScheduleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startMinute?: Prisma.SortOrder;
    endMinute?: Prisma.SortOrder;
    slotMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DoctorDateScheduleCountOrderByAggregateInput;
    _avg?: Prisma.DoctorDateScheduleAvgOrderByAggregateInput;
    _max?: Prisma.DoctorDateScheduleMaxOrderByAggregateInput;
    _min?: Prisma.DoctorDateScheduleMinOrderByAggregateInput;
    _sum?: Prisma.DoctorDateScheduleSumOrderByAggregateInput;
};
export type DoctorDateScheduleScalarWhereWithAggregatesInput = {
    AND?: Prisma.DoctorDateScheduleScalarWhereWithAggregatesInput | Prisma.DoctorDateScheduleScalarWhereWithAggregatesInput[];
    OR?: Prisma.DoctorDateScheduleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DoctorDateScheduleScalarWhereWithAggregatesInput | Prisma.DoctorDateScheduleScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DoctorDateSchedule"> | string;
    doctorId?: Prisma.UuidWithAggregatesFilter<"DoctorDateSchedule"> | string;
    workDate?: Prisma.DateTimeWithAggregatesFilter<"DoctorDateSchedule"> | Date | string;
    startMinute?: Prisma.IntWithAggregatesFilter<"DoctorDateSchedule"> | number;
    endMinute?: Prisma.IntWithAggregatesFilter<"DoctorDateSchedule"> | number;
    slotMinutes?: Prisma.IntWithAggregatesFilter<"DoctorDateSchedule"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"DoctorDateSchedule"> | boolean;
    note?: Prisma.StringNullableWithAggregatesFilter<"DoctorDateSchedule"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DoctorDateSchedule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DoctorDateSchedule"> | Date | string;
};
export type DoctorDateScheduleCreateInput = {
    id?: string;
    workDate: Date | string;
    startMinute: number;
    endMinute: number;
    slotMinutes?: number;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor: Prisma.DoctorProfileCreateNestedOneWithoutDateSchedulesInput;
};
export type DoctorDateScheduleUncheckedCreateInput = {
    id?: string;
    doctorId: string;
    workDate: Date | string;
    startMinute: number;
    endMinute: number;
    slotMinutes?: number;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorDateScheduleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    endMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    slotMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorProfileUpdateOneRequiredWithoutDateSchedulesNestedInput;
};
export type DoctorDateScheduleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    endMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    slotMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorDateScheduleCreateManyInput = {
    id?: string;
    doctorId: string;
    workDate: Date | string;
    startMinute: number;
    endMinute: number;
    slotMinutes?: number;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorDateScheduleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    endMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    slotMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorDateScheduleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    endMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    slotMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorDateScheduleListRelationFilter = {
    every?: Prisma.DoctorDateScheduleWhereInput;
    some?: Prisma.DoctorDateScheduleWhereInput;
    none?: Prisma.DoctorDateScheduleWhereInput;
};
export type DoctorDateScheduleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DoctorDateScheduleDoctorIdWorkDateStartMinuteEndMinuteCompoundUniqueInput = {
    doctorId: string;
    workDate: Date | string;
    startMinute: number;
    endMinute: number;
};
export type DoctorDateScheduleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startMinute?: Prisma.SortOrder;
    endMinute?: Prisma.SortOrder;
    slotMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorDateScheduleAvgOrderByAggregateInput = {
    startMinute?: Prisma.SortOrder;
    endMinute?: Prisma.SortOrder;
    slotMinutes?: Prisma.SortOrder;
};
export type DoctorDateScheduleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startMinute?: Prisma.SortOrder;
    endMinute?: Prisma.SortOrder;
    slotMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorDateScheduleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startMinute?: Prisma.SortOrder;
    endMinute?: Prisma.SortOrder;
    slotMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorDateScheduleSumOrderByAggregateInput = {
    startMinute?: Prisma.SortOrder;
    endMinute?: Prisma.SortOrder;
    slotMinutes?: Prisma.SortOrder;
};
export type DoctorDateScheduleCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.DoctorDateScheduleCreateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput> | Prisma.DoctorDateScheduleCreateWithoutDoctorInput[] | Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput | Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.DoctorDateScheduleCreateManyDoctorInputEnvelope;
    connect?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
};
export type DoctorDateScheduleUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.DoctorDateScheduleCreateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput> | Prisma.DoctorDateScheduleCreateWithoutDoctorInput[] | Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput | Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.DoctorDateScheduleCreateManyDoctorInputEnvelope;
    connect?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
};
export type DoctorDateScheduleUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorDateScheduleCreateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput> | Prisma.DoctorDateScheduleCreateWithoutDoctorInput[] | Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput | Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.DoctorDateScheduleUpsertWithWhereUniqueWithoutDoctorInput | Prisma.DoctorDateScheduleUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.DoctorDateScheduleCreateManyDoctorInputEnvelope;
    set?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    disconnect?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    delete?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    connect?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    update?: Prisma.DoctorDateScheduleUpdateWithWhereUniqueWithoutDoctorInput | Prisma.DoctorDateScheduleUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.DoctorDateScheduleUpdateManyWithWhereWithoutDoctorInput | Prisma.DoctorDateScheduleUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.DoctorDateScheduleScalarWhereInput | Prisma.DoctorDateScheduleScalarWhereInput[];
};
export type DoctorDateScheduleUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorDateScheduleCreateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput> | Prisma.DoctorDateScheduleCreateWithoutDoctorInput[] | Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput | Prisma.DoctorDateScheduleCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.DoctorDateScheduleUpsertWithWhereUniqueWithoutDoctorInput | Prisma.DoctorDateScheduleUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.DoctorDateScheduleCreateManyDoctorInputEnvelope;
    set?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    disconnect?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    delete?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    connect?: Prisma.DoctorDateScheduleWhereUniqueInput | Prisma.DoctorDateScheduleWhereUniqueInput[];
    update?: Prisma.DoctorDateScheduleUpdateWithWhereUniqueWithoutDoctorInput | Prisma.DoctorDateScheduleUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.DoctorDateScheduleUpdateManyWithWhereWithoutDoctorInput | Prisma.DoctorDateScheduleUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.DoctorDateScheduleScalarWhereInput | Prisma.DoctorDateScheduleScalarWhereInput[];
};
export type DoctorDateScheduleCreateWithoutDoctorInput = {
    id?: string;
    workDate: Date | string;
    startMinute: number;
    endMinute: number;
    slotMinutes?: number;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorDateScheduleUncheckedCreateWithoutDoctorInput = {
    id?: string;
    workDate: Date | string;
    startMinute: number;
    endMinute: number;
    slotMinutes?: number;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorDateScheduleCreateOrConnectWithoutDoctorInput = {
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorDateScheduleCreateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput>;
};
export type DoctorDateScheduleCreateManyDoctorInputEnvelope = {
    data: Prisma.DoctorDateScheduleCreateManyDoctorInput | Prisma.DoctorDateScheduleCreateManyDoctorInput[];
    skipDuplicates?: boolean;
};
export type DoctorDateScheduleUpsertWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
    update: Prisma.XOR<Prisma.DoctorDateScheduleUpdateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.DoctorDateScheduleCreateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedCreateWithoutDoctorInput>;
};
export type DoctorDateScheduleUpdateWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
    data: Prisma.XOR<Prisma.DoctorDateScheduleUpdateWithoutDoctorInput, Prisma.DoctorDateScheduleUncheckedUpdateWithoutDoctorInput>;
};
export type DoctorDateScheduleUpdateManyWithWhereWithoutDoctorInput = {
    where: Prisma.DoctorDateScheduleScalarWhereInput;
    data: Prisma.XOR<Prisma.DoctorDateScheduleUpdateManyMutationInput, Prisma.DoctorDateScheduleUncheckedUpdateManyWithoutDoctorInput>;
};
export type DoctorDateScheduleScalarWhereInput = {
    AND?: Prisma.DoctorDateScheduleScalarWhereInput | Prisma.DoctorDateScheduleScalarWhereInput[];
    OR?: Prisma.DoctorDateScheduleScalarWhereInput[];
    NOT?: Prisma.DoctorDateScheduleScalarWhereInput | Prisma.DoctorDateScheduleScalarWhereInput[];
    id?: Prisma.UuidFilter<"DoctorDateSchedule"> | string;
    doctorId?: Prisma.UuidFilter<"DoctorDateSchedule"> | string;
    workDate?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    startMinute?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    endMinute?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    slotMinutes?: Prisma.IntFilter<"DoctorDateSchedule"> | number;
    isActive?: Prisma.BoolFilter<"DoctorDateSchedule"> | boolean;
    note?: Prisma.StringNullableFilter<"DoctorDateSchedule"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorDateSchedule"> | Date | string;
};
export type DoctorDateScheduleCreateManyDoctorInput = {
    id?: string;
    workDate: Date | string;
    startMinute: number;
    endMinute: number;
    slotMinutes?: number;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorDateScheduleUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    endMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    slotMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorDateScheduleUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    endMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    slotMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorDateScheduleUncheckedUpdateManyWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    endMinute?: Prisma.IntFieldUpdateOperationsInput | number;
    slotMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorDateScheduleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    workDate?: boolean;
    startMinute?: boolean;
    endMinute?: boolean;
    slotMinutes?: boolean;
    isActive?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorDateSchedule"]>;
export type DoctorDateScheduleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    workDate?: boolean;
    startMinute?: boolean;
    endMinute?: boolean;
    slotMinutes?: boolean;
    isActive?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorDateSchedule"]>;
export type DoctorDateScheduleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    workDate?: boolean;
    startMinute?: boolean;
    endMinute?: boolean;
    slotMinutes?: boolean;
    isActive?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorDateSchedule"]>;
export type DoctorDateScheduleSelectScalar = {
    id?: boolean;
    doctorId?: boolean;
    workDate?: boolean;
    startMinute?: boolean;
    endMinute?: boolean;
    slotMinutes?: boolean;
    isActive?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DoctorDateScheduleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "doctorId" | "workDate" | "startMinute" | "endMinute" | "slotMinutes" | "isActive" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["doctorDateSchedule"]>;
export type DoctorDateScheduleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorProfileDefaultArgs<ExtArgs>;
};
export type DoctorDateScheduleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorProfileDefaultArgs<ExtArgs>;
};
export type DoctorDateScheduleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorProfileDefaultArgs<ExtArgs>;
};
export type $DoctorDateSchedulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DoctorDateSchedule";
    objects: {
        doctor: Prisma.$DoctorProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        doctorId: string;
        workDate: Date;
        startMinute: number;
        endMinute: number;
        slotMinutes: number;
        isActive: boolean;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["doctorDateSchedule"]>;
    composites: {};
};
export type DoctorDateScheduleGetPayload<S extends boolean | null | undefined | DoctorDateScheduleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload, S>;
export type DoctorDateScheduleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DoctorDateScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DoctorDateScheduleCountAggregateInputType | true;
};
export interface DoctorDateScheduleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DoctorDateSchedule'];
        meta: {
            name: 'DoctorDateSchedule';
        };
    };
    /**
     * Find zero or one DoctorDateSchedule that matches the filter.
     * @param {DoctorDateScheduleFindUniqueArgs} args - Arguments to find a DoctorDateSchedule
     * @example
     * // Get one DoctorDateSchedule
     * const doctorDateSchedule = await prisma.doctorDateSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorDateScheduleFindUniqueArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DoctorDateSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorDateScheduleFindUniqueOrThrowArgs} args - Arguments to find a DoctorDateSchedule
     * @example
     * // Get one DoctorDateSchedule
     * const doctorDateSchedule = await prisma.doctorDateSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorDateScheduleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DoctorDateSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorDateScheduleFindFirstArgs} args - Arguments to find a DoctorDateSchedule
     * @example
     * // Get one DoctorDateSchedule
     * const doctorDateSchedule = await prisma.doctorDateSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorDateScheduleFindFirstArgs>(args?: Prisma.SelectSubset<T, DoctorDateScheduleFindFirstArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DoctorDateSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorDateScheduleFindFirstOrThrowArgs} args - Arguments to find a DoctorDateSchedule
     * @example
     * // Get one DoctorDateSchedule
     * const doctorDateSchedule = await prisma.doctorDateSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorDateScheduleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DoctorDateScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DoctorDateSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorDateScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorDateSchedules
     * const doctorDateSchedules = await prisma.doctorDateSchedule.findMany()
     *
     * // Get first 10 DoctorDateSchedules
     * const doctorDateSchedules = await prisma.doctorDateSchedule.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const doctorDateScheduleWithIdOnly = await prisma.doctorDateSchedule.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DoctorDateScheduleFindManyArgs>(args?: Prisma.SelectSubset<T, DoctorDateScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DoctorDateSchedule.
     * @param {DoctorDateScheduleCreateArgs} args - Arguments to create a DoctorDateSchedule.
     * @example
     * // Create one DoctorDateSchedule
     * const DoctorDateSchedule = await prisma.doctorDateSchedule.create({
     *   data: {
     *     // ... data to create a DoctorDateSchedule
     *   }
     * })
     *
     */
    create<T extends DoctorDateScheduleCreateArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleCreateArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DoctorDateSchedules.
     * @param {DoctorDateScheduleCreateManyArgs} args - Arguments to create many DoctorDateSchedules.
     * @example
     * // Create many DoctorDateSchedules
     * const doctorDateSchedule = await prisma.doctorDateSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DoctorDateScheduleCreateManyArgs>(args?: Prisma.SelectSubset<T, DoctorDateScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DoctorDateSchedules and returns the data saved in the database.
     * @param {DoctorDateScheduleCreateManyAndReturnArgs} args - Arguments to create many DoctorDateSchedules.
     * @example
     * // Create many DoctorDateSchedules
     * const doctorDateSchedule = await prisma.doctorDateSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DoctorDateSchedules and only return the `id`
     * const doctorDateScheduleWithIdOnly = await prisma.doctorDateSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DoctorDateScheduleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DoctorDateScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DoctorDateSchedule.
     * @param {DoctorDateScheduleDeleteArgs} args - Arguments to delete one DoctorDateSchedule.
     * @example
     * // Delete one DoctorDateSchedule
     * const DoctorDateSchedule = await prisma.doctorDateSchedule.delete({
     *   where: {
     *     // ... filter to delete one DoctorDateSchedule
     *   }
     * })
     *
     */
    delete<T extends DoctorDateScheduleDeleteArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleDeleteArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DoctorDateSchedule.
     * @param {DoctorDateScheduleUpdateArgs} args - Arguments to update one DoctorDateSchedule.
     * @example
     * // Update one DoctorDateSchedule
     * const doctorDateSchedule = await prisma.doctorDateSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DoctorDateScheduleUpdateArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleUpdateArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DoctorDateSchedules.
     * @param {DoctorDateScheduleDeleteManyArgs} args - Arguments to filter DoctorDateSchedules to delete.
     * @example
     * // Delete a few DoctorDateSchedules
     * const { count } = await prisma.doctorDateSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DoctorDateScheduleDeleteManyArgs>(args?: Prisma.SelectSubset<T, DoctorDateScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DoctorDateSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorDateScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorDateSchedules
     * const doctorDateSchedule = await prisma.doctorDateSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DoctorDateScheduleUpdateManyArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DoctorDateSchedules and returns the data updated in the database.
     * @param {DoctorDateScheduleUpdateManyAndReturnArgs} args - Arguments to update many DoctorDateSchedules.
     * @example
     * // Update many DoctorDateSchedules
     * const doctorDateSchedule = await prisma.doctorDateSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DoctorDateSchedules and only return the `id`
     * const doctorDateScheduleWithIdOnly = await prisma.doctorDateSchedule.updateManyAndReturn({
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
    updateManyAndReturn<T extends DoctorDateScheduleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DoctorDateSchedule.
     * @param {DoctorDateScheduleUpsertArgs} args - Arguments to update or create a DoctorDateSchedule.
     * @example
     * // Update or create a DoctorDateSchedule
     * const doctorDateSchedule = await prisma.doctorDateSchedule.upsert({
     *   create: {
     *     // ... data to create a DoctorDateSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorDateSchedule we want to update
     *   }
     * })
     */
    upsert<T extends DoctorDateScheduleUpsertArgs>(args: Prisma.SelectSubset<T, DoctorDateScheduleUpsertArgs<ExtArgs>>): Prisma.Prisma__DoctorDateScheduleClient<runtime.Types.Result.GetResult<Prisma.$DoctorDateSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DoctorDateSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorDateScheduleCountArgs} args - Arguments to filter DoctorDateSchedules to count.
     * @example
     * // Count the number of DoctorDateSchedules
     * const count = await prisma.doctorDateSchedule.count({
     *   where: {
     *     // ... the filter for the DoctorDateSchedules we want to count
     *   }
     * })
    **/
    count<T extends DoctorDateScheduleCountArgs>(args?: Prisma.Subset<T, DoctorDateScheduleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DoctorDateScheduleCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DoctorDateSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorDateScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorDateScheduleAggregateArgs>(args: Prisma.Subset<T, DoctorDateScheduleAggregateArgs>): Prisma.PrismaPromise<GetDoctorDateScheduleAggregateType<T>>;
    /**
     * Group by DoctorDateSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorDateScheduleGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DoctorDateScheduleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DoctorDateScheduleGroupByArgs['orderBy'];
    } : {
        orderBy?: DoctorDateScheduleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DoctorDateScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorDateScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DoctorDateSchedule model
     */
    readonly fields: DoctorDateScheduleFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DoctorDateSchedule.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DoctorDateScheduleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    doctor<T extends Prisma.DoctorProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__DoctorProfileClient<runtime.Types.Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DoctorDateSchedule model
 */
export interface DoctorDateScheduleFieldRefs {
    readonly id: Prisma.FieldRef<"DoctorDateSchedule", 'String'>;
    readonly doctorId: Prisma.FieldRef<"DoctorDateSchedule", 'String'>;
    readonly workDate: Prisma.FieldRef<"DoctorDateSchedule", 'DateTime'>;
    readonly startMinute: Prisma.FieldRef<"DoctorDateSchedule", 'Int'>;
    readonly endMinute: Prisma.FieldRef<"DoctorDateSchedule", 'Int'>;
    readonly slotMinutes: Prisma.FieldRef<"DoctorDateSchedule", 'Int'>;
    readonly isActive: Prisma.FieldRef<"DoctorDateSchedule", 'Boolean'>;
    readonly note: Prisma.FieldRef<"DoctorDateSchedule", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DoctorDateSchedule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DoctorDateSchedule", 'DateTime'>;
}
/**
 * DoctorDateSchedule findUnique
 */
export type DoctorDateScheduleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DoctorDateSchedule to fetch.
     */
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
};
/**
 * DoctorDateSchedule findUniqueOrThrow
 */
export type DoctorDateScheduleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DoctorDateSchedule to fetch.
     */
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
};
/**
 * DoctorDateSchedule findFirst
 */
export type DoctorDateScheduleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DoctorDateSchedule to fetch.
     */
    where?: Prisma.DoctorDateScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorDateSchedules to fetch.
     */
    orderBy?: Prisma.DoctorDateScheduleOrderByWithRelationInput | Prisma.DoctorDateScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DoctorDateSchedules.
     */
    cursor?: Prisma.DoctorDateScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorDateSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorDateSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorDateSchedules.
     */
    distinct?: Prisma.DoctorDateScheduleScalarFieldEnum | Prisma.DoctorDateScheduleScalarFieldEnum[];
};
/**
 * DoctorDateSchedule findFirstOrThrow
 */
export type DoctorDateScheduleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DoctorDateSchedule to fetch.
     */
    where?: Prisma.DoctorDateScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorDateSchedules to fetch.
     */
    orderBy?: Prisma.DoctorDateScheduleOrderByWithRelationInput | Prisma.DoctorDateScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DoctorDateSchedules.
     */
    cursor?: Prisma.DoctorDateScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorDateSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorDateSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorDateSchedules.
     */
    distinct?: Prisma.DoctorDateScheduleScalarFieldEnum | Prisma.DoctorDateScheduleScalarFieldEnum[];
};
/**
 * DoctorDateSchedule findMany
 */
export type DoctorDateScheduleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DoctorDateSchedules to fetch.
     */
    where?: Prisma.DoctorDateScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorDateSchedules to fetch.
     */
    orderBy?: Prisma.DoctorDateScheduleOrderByWithRelationInput | Prisma.DoctorDateScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DoctorDateSchedules.
     */
    cursor?: Prisma.DoctorDateScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorDateSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorDateSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorDateSchedules.
     */
    distinct?: Prisma.DoctorDateScheduleScalarFieldEnum | Prisma.DoctorDateScheduleScalarFieldEnum[];
};
/**
 * DoctorDateSchedule create
 */
export type DoctorDateScheduleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a DoctorDateSchedule.
     */
    data: Prisma.XOR<Prisma.DoctorDateScheduleCreateInput, Prisma.DoctorDateScheduleUncheckedCreateInput>;
};
/**
 * DoctorDateSchedule createMany
 */
export type DoctorDateScheduleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorDateSchedules.
     */
    data: Prisma.DoctorDateScheduleCreateManyInput | Prisma.DoctorDateScheduleCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DoctorDateSchedule createManyAndReturn
 */
export type DoctorDateScheduleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorDateSchedule
     */
    select?: Prisma.DoctorDateScheduleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorDateSchedule
     */
    omit?: Prisma.DoctorDateScheduleOmit<ExtArgs> | null;
    /**
     * The data used to create many DoctorDateSchedules.
     */
    data: Prisma.DoctorDateScheduleCreateManyInput | Prisma.DoctorDateScheduleCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorDateScheduleIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DoctorDateSchedule update
 */
export type DoctorDateScheduleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a DoctorDateSchedule.
     */
    data: Prisma.XOR<Prisma.DoctorDateScheduleUpdateInput, Prisma.DoctorDateScheduleUncheckedUpdateInput>;
    /**
     * Choose, which DoctorDateSchedule to update.
     */
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
};
/**
 * DoctorDateSchedule updateMany
 */
export type DoctorDateScheduleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorDateSchedules.
     */
    data: Prisma.XOR<Prisma.DoctorDateScheduleUpdateManyMutationInput, Prisma.DoctorDateScheduleUncheckedUpdateManyInput>;
    /**
     * Filter which DoctorDateSchedules to update
     */
    where?: Prisma.DoctorDateScheduleWhereInput;
    /**
     * Limit how many DoctorDateSchedules to update.
     */
    limit?: number;
};
/**
 * DoctorDateSchedule updateManyAndReturn
 */
export type DoctorDateScheduleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorDateSchedule
     */
    select?: Prisma.DoctorDateScheduleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorDateSchedule
     */
    omit?: Prisma.DoctorDateScheduleOmit<ExtArgs> | null;
    /**
     * The data used to update DoctorDateSchedules.
     */
    data: Prisma.XOR<Prisma.DoctorDateScheduleUpdateManyMutationInput, Prisma.DoctorDateScheduleUncheckedUpdateManyInput>;
    /**
     * Filter which DoctorDateSchedules to update
     */
    where?: Prisma.DoctorDateScheduleWhereInput;
    /**
     * Limit how many DoctorDateSchedules to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorDateScheduleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DoctorDateSchedule upsert
 */
export type DoctorDateScheduleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the DoctorDateSchedule to update in case it exists.
     */
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
    /**
     * In case the DoctorDateSchedule found by the `where` argument doesn't exist, create a new DoctorDateSchedule with this data.
     */
    create: Prisma.XOR<Prisma.DoctorDateScheduleCreateInput, Prisma.DoctorDateScheduleUncheckedCreateInput>;
    /**
     * In case the DoctorDateSchedule was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DoctorDateScheduleUpdateInput, Prisma.DoctorDateScheduleUncheckedUpdateInput>;
};
/**
 * DoctorDateSchedule delete
 */
export type DoctorDateScheduleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which DoctorDateSchedule to delete.
     */
    where: Prisma.DoctorDateScheduleWhereUniqueInput;
};
/**
 * DoctorDateSchedule deleteMany
 */
export type DoctorDateScheduleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorDateSchedules to delete
     */
    where?: Prisma.DoctorDateScheduleWhereInput;
    /**
     * Limit how many DoctorDateSchedules to delete.
     */
    limit?: number;
};
/**
 * DoctorDateSchedule without action
 */
export type DoctorDateScheduleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=DoctorDateSchedule.d.ts.map