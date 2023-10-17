import { Badge, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UploadReceipt from "./UploadReceipt";

export default function ButtonUpload({ transactionId }) {
  const [uploadedImage, setUploadedImage] = useState("");
  const txnid = transactionId;
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [uploadReceipt, setUploadReceipt] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("photo");

  const handleSavePhoto = (newPhoto) => {
    setCurrentPhoto(newPhoto);
  };

  const openPhotoModal = (e) => {
    e.stopPropagation();
    setUploadReceipt(true);
  };

  const closePhotoModal = () => {
    setUploadReceipt(false);
  };

  return (
    <Box>
      <Badge
        cursor={"pointer"}
        _hover={{ bgColor: "white", color: "black" }}
        onClick={openPhotoModal}
      >
        UPLOAD
      </Badge>
      <UploadReceipt
        isOpen={uploadReceipt}
        onClose={closePhotoModal}
        currentPhoto={currentPhoto}
        onSave={handleSavePhoto}
        onImageUpload={handleImageUpload}
        txnid={txnid}
      />
    </Box>
  );
}
