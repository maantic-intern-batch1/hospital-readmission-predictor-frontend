/* eslint-disable no-unused-vars */
import { Button, Container, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import InputText from "../component/InputText";
import SelectOption from "../component/SelectOption";
import { patientData, patientData_for_input } from "../constants/data";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { userNotExists } from "../redux/reducers/auth";

// eslint-disable-next-line react/prop-types
const FormLayout = ({ loading, setLoading, setOutput }) => {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Ethnicity: "",
    Heart_Diseases: "",
    Hypertension: "",
    Diabetes: "",
    COPD: "",
    CKD: "",
    Cancer: "",
    HIV_AIDS: "",
    IBD: "",
    Osteoarthritis: "",
    Neurological_Disorders: "",
    Liver_Related_Conditions: "",
    Other: "",
    Hemoglobin_Levels: "",
    Creatinine_Levels: "",
    Blood_Glucose_Levels: "",
    Cholesterol_Levels: "",
    Inflammatory_Markers: "",
    Liver_Function_Tests: "",
    Renal_Function_Tests: "",
    Depression: "",
    Anxiety: "",
    Alcohol: "",
    Drugs: "",
    Smoking: "",
    Number_Of_Medications: "",
    Medication_Adherence: "",
    Medication_Type: "",
    Side_Effects_And_Complications: "",
    Discharge_To: "",
    Follow_Up_Scheduled: "",
    Follow_Up_Attendance: "",
    Health_Literacy: "",
    Proactivity_In_Health: "",
    Income_Level: "",
    Employment_Status: "",
    Education_Level: "",
    Insurance_Coverage: "",
    Access_To_Healthy_Food: "",
    Insurance_Type: "",
    Household_Composition: "",
    Housing_Stability: "",
    Neighborhood_Safety: "",
    Support_System_Availability: "",
    Previous_Readmissions: "",
    Emergency_Visits: "",
    Hospital_Stay_Duration: "",
    Distance_From_Hospital: "",
  });
  // const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const server_url = import.meta.env.VITE_SERVER_URL;

  // Handle input change
  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Handle form submission
  async function submitHandler(event) {
    event.preventDefault();
    const age = parseInt(formData.Age.trim());
    if (age < 18 || age > 90) {
      toast.error("Please enter age between 18-60");
      return;
    }
    if (
      parseInt(formData.Previous_Readmissions.trim()) < 0 ||
      parseInt(formData.Previous_Readmissions.trim()) > 5
    ) {
      toast.error("Please enter Previous_Readmissions between 0-5");
      return;
    }
    if (
      parseInt(formData.Emergency_Visits.trim()) < 0 ||
      parseInt(formData.Emergency_Visits.trim()) > 3
    ) {
      toast.error("Please enter Emergency_Visits between 0-3");
      return;
    }
    if (
      parseInt(formData.Hospital_Stay_Duration.trim()) < 1 ||
      parseInt(formData.Hospital_Stay_Duration.trim()) > 15
    ) {
      toast.error("Please enter Hospital_Stay_Duration between 1-15");
      return;
    }
    if (
      parseInt(formData.Distance_From_Hospital.trim()) < 1 ||
      parseInt(formData.Distance_From_Hospital.trim()) > 50
    ) {
      toast.error("Please enter Distance_From_Hospital between 1-50");
      return;
    }
    setLoading(true);
    await getData();
    setLoading(false);
  }

  // logout handler
  const logoutHandler = async () => {
    toast.dismiss();  // Dismiss any existing toasts before showing a new one
    toast.loading("Logging out...");
    try {
      await axios.get(`${server_url}/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.dismiss();  // Dismiss loading toast after operation
      toast.success("Logged out successfully");
    } catch (error) {
      toast.dismiss();  // Dismiss loading toast on error
      toast.error("Logout failed");
    }
  
    dispatch(userNotExists());
  };
  
// this function handles the output predction
  const getData = async () => {
    await axios
      .post(`${server_url}/predict`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(
        //   "Printing response: " + JSON.stringify(res.data.data, null, 2)
        // );
        setOutput(JSON.stringify(res.data.data, null, 2));
      })
      .catch((err) => console.log("Printing output error", err));
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Tooltip title="Logout">
          <Button
            sx={{
              position: "absolute",
              top: "2rem",
              right: "1rem",
              fontSize: "2rem",
              color: "black",
            }}
            onClick={logoutHandler}
          >
            <IoIosLogOut />
          </Button>
        </Tooltip>
        <Typography variant="h4" sx={{ mt: "3rem" }}>
          Hospital Readmission Predictor
        </Typography>
        <Container
          sx={{
            m: "2rem auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Age */}
          <InputText
            name={"Age"}
            value={formData["Age"]}
            onChange={changeHandler}
          />

          {patientData?.map((data, index) => {
            const fieldName = Object.keys(data)[0];
            const fieldValues = data[fieldName];
            return (
              <SelectOption
                key={index}
                name={fieldName}
                value={formData[fieldName]} // dynamically set the value from formData
                onChange={changeHandler} // function to handle input change
                fieldValues={fieldValues} // options for the select dropdown
              />
            );
          })}

          {patientData_for_input?.map((data, index) => (
            <InputText
              key={index}
              name={data}
              value={formData[data]}
              onChange={changeHandler}
            />
          ))}
        </Container>
        {loading ? (
          <Button disabled variant="contained" sx={{ margin: "2rem auto" }}>
            Predicting...
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "2rem auto" }}
          >
            Predict Here
          </Button>
        )}
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default FormLayout;
