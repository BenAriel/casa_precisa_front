"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface selectBoxProps {
  campo: string;
  id: string;
  onChange: (value: string) => void;
}

export default function SelectBox({ campo, id, onChange }: selectBoxProps) {
  const [valor, setValor] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValor(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`select-${id}`}>{campo}</InputLabel>
      <Select
        labelId={`select-${id}`}
        id={id}
        value={valor}
        label={campo}
        onChange={handleChange}
      >
        <MenuItem value="">
        </MenuItem>
        <MenuItem value={0}>Zero</MenuItem>
        <MenuItem value={1}>Um</MenuItem>
        <MenuItem value={2}>Dois</MenuItem>
        <MenuItem value={3}>Três</MenuItem>
        <MenuItem value={4}>Quatro</MenuItem>
        <MenuItem value={5}>Cinco</MenuItem>
        <MenuItem value={6}>Seis</MenuItem>
        <MenuItem value={7}>Sete</MenuItem>
        <MenuItem value={8}>Oito</MenuItem>
        <MenuItem value={9}>Nove</MenuItem>
        <MenuItem value={10}>Dez ou mais</MenuItem>
      </Select>
    </FormControl>
  );
}
