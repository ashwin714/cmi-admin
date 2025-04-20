import { Box, Button, Grid, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AutoCompleteDropdown from '../../Component/Dropdown/AutoCompleteDropdown';
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryData, GetFilterData, ProductData } from './ProductSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
//   const colorList=[{name:"Blue", value:"Blue"}]
//   const sizeList=[{name:"Normal", value:"Normal"}]
//   const MaterialList=[{name:"Plastic", value:"Plastic"}]
const ProductFilter = ({
    open, handleClose, setFilter
}) => {
    const dispatch = useDispatch();
    const getFilterList = useSelector(ProductData)?.getFilter;
    const catList = useSelector(ProductData)?.getCategory;
    const [color, setColor] = useState('');
    const [material, setMaterial] = useState('');
    const [category, setCategory] = useState([]);
    const colorList = getFilterList?.color?.map((item, index) => ({
        name: item,
        id: index
    }));
    const materialList = getFilterList?.material?.map((item, index) => ({
        name: item,
        id: index
    }));
    const categoryList = catList?.map((item, index) => ({
        name: item,
        id: index
    }));
    useEffect(() => {
        dispatch(GetFilterData());
        dispatch(GetCategoryData());
    }, []);

    const handleFilter = () => {
        const newFilter = {};
    
        if (color) {
            newFilter["color"] = {
                "value": color,
                "operator": "LIKE"
            };
        }

    
        if (material) {
            newFilter["material"] = {
                "value": material,
                "operator": "LIKE"
            };
        }
    
        if (category && category.length > 0) {
            newFilter["category"] = {
                "value": category,
                "operator": "LIKE"
            };
        }
    
        setFilter(newFilter);
        handleClose();
        //console.log(newFilter)
    }
    
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container>
                    <Grid sm={12} item >
                        <AutoCompleteDropdown
                            label="Color"
                            dataSet={colorList}
                            getOptionLabel="name"
                            selectedValue={color}
                            getOptionValue="name"
                            onChange={setColor}
                        //isRequired
                        />
                    </Grid>
                    <Grid sm={12} item sx={{ mt: 1 }}>
                        <AutoCompleteDropdown
                            label="Material"
                            dataSet={materialList}
                            getOptionLabel="name"
                            selectedValue={material}
                            getOptionValue="name"
                            onChange={setMaterial}
                        //isRequired
                        />
                    </Grid>
                    <Grid sm={12} item sx={{ mt: 1 }}>
                        <AutoCompleteDropdown
                            label="Category"
                            dataSet={categoryList}
                            getOptionLabel="name"
                            selectedValue={category}
                            getOptionValue="name"
                            onChange={setCategory}
                        //isRequired
                        />
                    </Grid>
                    <Grid sm={12} item sx={{ mt: 2 }} style={{ textAlign: "center" }}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            className="border-button"
                            onClick={handleFilter}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default ProductFilter