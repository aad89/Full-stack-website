import React from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import '@mantine/core/styles.css';
import Map from "../Map/Map";
import { validateString } from "../../utils/common";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country || "",  // Ensure fallback value for country
      city: propertyDetails?.city || "",
      address: propertyDetails?.address || "",
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    console.log('Validation Errors:', hasErrors);  // Log validation errors
    if (!hasErrors) {
      console.log('Form Values:', form.values);  // Log form values
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        {/* left side */}
        <div style={{ flex: 1, gap: "1rem", display: "flex", flexDirection: "column", margin: "auto" }}>
          <Select
            style={{ width: "100%" }}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}  // Ensure getAll() returns valid data
            {...form.getInputProps("country")}
          />

          <TextInput
            style={{ width: "100%" }}
            withAsterisk
            label="City"
            {...form.getInputProps("city")}
          />

          <TextInput
            style={{ width: "100%" }}
            withAsterisk
            label="Address"
            {...form.getInputProps("address")}
          />
        </div>

        {/* right side */}
        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      {/* Button Section */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Button style={{ fontSize: '1.5rem', width: '20%'}} type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default AddLocation;
