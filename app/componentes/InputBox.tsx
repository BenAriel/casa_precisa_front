"use client";
import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";

interface inputBoxProps {
  tag: string;
  titulo: string;
  id: string;
  onChange: (value: string) => void;
}

export default function InputBox({ tag, titulo, id, onChange }: inputBoxProps) {
  const [valor, setValor] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value);
    onChange(event.target.value);
  };

  return (
    <TextField
      label={titulo}
      id={id}
      sx={{ m: 1, width: "25ch" }}
      value={valor}
      onChange={handleChange}
      InputProps={{
        endAdornment: <InputAdornment position="end">{tag}</InputAdornment>,
      }}
    />
  );
}
