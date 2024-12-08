import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../util/firebase";
import { useDispatch } from "react-redux";
import { addPointToStore } from "../../store/mapSlice.js";
import { Description } from "@mui/icons-material";
import { ApiUtils } from "../../Utils/ApiUtil";

const PoopForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        setSelectedImage(byteArray);
      };
      reader.readAsArrayBuffer(file);
      //   setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const resetDialog = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setDescription(null);
  };
  const uint8ArrayToBase64 = (uint8Array) => {
    let binaryString = "";

    // Create a binary string from the Uint8Array
    for (let i = 0; i < uint8Array.length; i++) {
      binaryString += String.fromCharCode(uint8Array[i]);
    }

    // Convert binary string to Base64
    return btoa(binaryString);
  };

  const makeRealPoint = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const data = new Uint8Array(selectedImage);
        const base64String = uint8ArrayToBase64(data);
        // const base64String = btoa(String.fromCharCode(...selectedImage));
        var newPoint = {
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
          UserId: user?.uid,
          Anonymous: anonymous,
          Image: base64String,
          Description: description,
        };

        await addPoint(newPoint);
        resetDialog();
        onClose();
      } catch (e) {
        console.log(e);
      }
    });
  };

  const addPoint = async (point) => {
    try {
      const result = await ApiUtils.Post("points", point);
      if (result.status === 201) {
        dispatch(addPointToStore(result.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const OnSubmit = () => {
    makeRealPoint();
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>Report Form</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            placeholder="Add any details..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload-input"
          />
          <div>
            <label
              htmlFor="image-upload-input"
              style={{ cursor: "pointer", color: "blue" }}
            >
              Click here to upload a picture
            </label>
            {previewUrl && (
              <div className="image-preview">
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ width: "200px", marginTop: "10px" }}
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setPreviewUrl(null);
                  }}
                  style={{ display: "block", marginTop: "10px" }}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          Reporter:
          <Select defaultValue="user" margin="dense">
            <MenuItem value="user">{user?.displayName}</MenuItem>
            <MenuItem value="anon">Anonymous</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button variant="contained" onClick={OnSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PoopForm;
