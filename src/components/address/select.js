import { Autocomplete, Box, Skeleton, Stack, TextField } from "@mui/material";
import { regions } from "./regions";
import { useDistrict } from "@/hooks/useDistrict";
import { useWard } from "@/hooks/useWard";
import { useState } from "react";
import axiosClient from "@/axiosConfig/axiosClient";

function findLabel(id, data) {
    const result = data?.find(e => e.id == id)
    return result?.name || result?.attributes?.name
}

export default function SelectAddress({ formik, borderRadius = 1 }) {

    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const {districts,districtLoading,setDistricts} = useDistrict(formik?.values.region)
    const {wards,wardLoading,setWards} = useWard(formik?.values.district)

    const handleChangeRegion = async (event, value) => {
        setLoading1(true)
        setLoading2(true)
        try {
            const selectRegion = regions.find(e => e.name == value)
            // lấy ds district
            const districts = await axiosClient.get(`/open/districts?filters[region]=${selectRegion.id}&pagination[page]=1&pagination[pageSize]=100`)
            const districtId = districts?.data?.[0]?.id

            // lấy ds wards
            const wards = await axiosClient.get(`/open/wards?filters[district]=${districtId}&pagination[page]=1&pagination[pageSize]=100`)
            const wardId = wards?.data?.[0]?.id

            formik.setFieldValue('region', selectRegion.id)
            formik.setFieldValue('district', districtId)
            formik.setFieldValue('ward', wardId)

        } catch (error) {
            console.log("🚀 ~ handleChangeRegion ~ error:", error)
        }
        setLoading1(false)
        setLoading2(false)
        
    }

    const handleChangedistrict = async (event, value) => {
        const selectDistrict = districts?.data?.find(e => e.attributes.name == value)
        setLoading1(true)
        setLoading2(true)
        try {
            // lấy ds wards
            const wards = await axiosClient.get(`/open/wards?filters[district]=${selectDistrict?.id}&pagination[page]=1&pagination[pageSize]=100`)
            const wardId = wards?.data?.[0]?.id

            formik.setFieldValue('district', selectDistrict?.id)
            formik.setFieldValue('ward', wardId)
        } catch (error) {
            console.log("🚀 ~ handleChangedistrict ~ error:", error)
        }
        setLoading1(false)
        setLoading2(false)
    }

    const handleChangeWard = async (event, value) => {
        const selectWard = wards?.data?.find(e => e.attributes.name == value)
        formik.setFieldValue('ward', selectWard.id)
    }

    return(
        <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            alignItems={"center"} 
            spacing={{ xs: 2.5, md: 1 }}
        >
            <Box position={"relative"} width={"100%"}>
                <Autocomplete
                    disablePortal
                    id="region"
                    options={regions.map(option => option.name)}
                    sx={{
                        '& > div > div': {
                            borderRadius: borderRadius
                        }
                    }}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Tỉnh/Thành phố"
                        />
                    }
                    onChange={handleChangeRegion}
                    value={findLabel(formik?.values.region, regions)}
                    disableClearable
                />
            </Box>
            <Box position={"relative"} width={"100%"}>
                {!districts ?
                    <Skeleton variant="rounded" width={180} height={50} />
                    :
                    <Autocomplete
                        disablePortal
                        id="district"
                        options={districts?.data?.map(option => option?.attributes?.name)}
                        sx={{
                            '& > div > div': {
                                borderRadius: borderRadius
                            }
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                label={`Quận/Huyện`}
                            />
                        }
                        onChange={handleChangedistrict}
                        value={findLabel(formik?.values.district, districts?.data)}
                        disableClearable
                        disabled={loading1}
                    />
                }
            </Box>
            <Box position={"relative"} width={"100%"}>
                {!wards ?
                    <Skeleton variant="rounded" width={180} height={50} />
                    :
                    <Autocomplete
                        disablePortal
                        id="ward"
                        options={wards?.data?.map(option => option?.attributes?.name)}
                        sx={{
                            '& > div > div': {
                                borderRadius: borderRadius
                            }
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                label={`Phường/Xã`}
                            />
                        }
                        onChange={handleChangeWard}
                        value={findLabel(formik?.values.ward, wards?.data)}
                        disableClearable
                        disabled={loading2}
                    />
                }
            </Box>
        </Stack>
    )
}