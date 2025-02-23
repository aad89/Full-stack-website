import React, { useContext, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { DayPicker } from "react-day-picker"; // Import DayPicker component
import 'react-day-picker/dist/style.css'; // Ensure styles are included
import { useMutation } from "react-query";
import { bookVisit } from "../../utils/api"; // Assuming you have an API function for booking
import UserDetailContext from "../../context/UserDetailContext"; // Context for user details
import { toast } from "react-toastify"; // Toast notifications

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [selectedDate, setSelectedDate] = useState(null); // State to track selected date
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  // Handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date); // Update the selected date state
  };

  // Close the modal
  const handleClose = () => {
    setOpened(false);
  };

  // Handle successful booking
  const handleBookingSuccess = () => {
    toast.success("Visit booked successfully!", {
      position: "bottom-right",
    });
    // Optionally update the user context or UI
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: selectedDate.toLocaleDateString(),
        },
      ],
    }));
  };

  // Submit the booking
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(selectedDate, propertyId, email, token), // Pass the selected date to the API
    onSuccess: handleBookingSuccess, // Call success handler if booking is successful
    onError: (error) => toast.error(`Booking failed: ${error.message}`), // Handle errors
    onSettled: () => setOpened(false), // Close the modal when the mutation is settled
  });

  const handleSubmit = () => {
    if (selectedDate) {
      mutate(); // Trigger the mutation to book the visit
    }
  };

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="booking-modal-title"
      aria-describedby="booking-modal-description"
    >
      <DialogTitle id="booking-modal-title">Select your date of visit</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Render DayPicker and pass selected date */}
        <DayPicker
          selected={selectedDate} // Pass selected date here
          onDayClick={handleDateSelection}
           fromDate = {new Date}// Update state on day click
        />
        <div style={{ marginTop: "10px", textAlign: "center", color: "red", fontWeight: 600 }}>
          {selectedDate && <p>Selected Date: {selectedDate.toLocaleDateString()}</p>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!selectedDate || isLoading} // Disable until a date is selected or loading
        >
          {isLoading ? "Booking..." : "Book Now"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
