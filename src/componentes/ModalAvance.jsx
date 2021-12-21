import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalAvance = ({ abrir, cerrar, datos, usuario_id, funcionCrear }) => {

    const [seleccionProyecto, setSeleccionProyecto] = React.useState("")
    const [descripcion, setDescripcion] = React.useState("")

    const handleClose = () => {
        setSeleccionProyecto("")
        setDescripcion("")
        cerrar()
    };


    const agregarAvance = () => {
        funcionCrear({
            variables: {
                Proyecto_Id: seleccionProyecto,
                Estudiante_Id: usuario_id,
                Descripcion: descripcion
            }
        })
        setSeleccionProyecto("")
        setDescripcion("")
        cerrar()
    }
    let acumulador = []
    let mostrar
    /* if (datos) {
        mostrar = datos.map((cadaAvance, index) => {
            //let ver_duplicados = acumulador.filter((avance, index) => acumulador.indexOf(avance.Proyecto_Id._id) === index)
            if (acumulador.includes(cadaAvance.Proyecto_Id._id)) {
                return null
            } else {
                acumulador.push(cadaAvance.Proyecto_Id._id)
                return (<MenuItem
                    key={index}
                    value={cadaAvance.Proyecto_Id._id} >
                    {cadaAvance.Proyecto_Id.Nombre_Proyecto}
                </MenuItem>
                )
            }
        })
    } */


    return (
        <Dialog
            open={abrir}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Agregar nuevo Avance"}</DialogTitle>
            <DialogContent>
                <Box sx={{ minWidth: 500 }} className='p-5' >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Proyecto</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Proyecto"
                            required
                            value={seleccionProyecto}
                            onChange={(e) => setSeleccionProyecto(e.target.value)}
                        >
                            {
                                mostrar = datos.map((cadaInscripcion, index) => {
                                    if (cadaInscripcion.Estado === "PENDIENTE" || cadaInscripcion.Estado === "RECHAZADA") {
                                        return null
                                    }
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={cadaInscripcion.Proyecto_Id._id} >
                                            {cadaInscripcion.Proyecto_Id.Nombre_Proyecto}
                                        </MenuItem>
                                    )
                                }
                                )
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 500 }} >
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Descripcion"
                        multiline
                        rows={3}
                        disabled={seleccionProyecto.length > 0 ? false : true}
                        required
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={agregarAvance}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalAvance