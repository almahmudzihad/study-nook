"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";

const EditRoomModal = ({
  isOpen,
  onOpenChange,
  room,
  onUpdated,
}) => {
  const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const [formData, setFormData] =
    useState({
      roomName: "",
      description: "",
      image: "",
      floor: "",
      capacity: "",
      hourlyRate: "",
      amenities: [],
    });

  useEffect(() => {
    if (room) {
      setFormData({
        roomName:
          room.roomName || "",
        description:
          room.description || "",
        image:
          room.image || "",
        floor:
          room.floor || "",
        capacity:
          room.capacity || "",
        hourlyRate:
          room.hourlyRate || "",
        amenities:
          room.amenities || [],
      });
    }
  }, [room]);

  const handleChange = (
    e
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleCheckbox =
    (item) => {
      setFormData((prev) => ({
        ...prev,
        amenities:
          prev.amenities.includes(
            item
          )
            ? prev.amenities.filter(
                (a) =>
                  a !== item
              )
            : [
                ...prev.amenities,
                item,
              ],
      }));
    };

  const handleSubmit =
    async () => {
      try {
        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                formData
              ),
            }
          );

        const data =
          await res.json();

        if (
          data.modifiedCount
        ) {
          onUpdated();
          onOpenChange(
            false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={
        onOpenChange
      }
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          Edit Room
        </ModalHeader>

        <ModalBody>

          <Input
            label="Room Name"
            name="roomName"
            value={
              formData.roomName
            }
            onChange={
              handleChange
            }
          />

          <Textarea
            label="Description"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <div className="grid md:grid-cols-2 gap-4">

            <Input
              label="Image URL"
              name="image"
              value={
                formData.image
              }
              onChange={
                handleChange
              }
            />

            <Input
              label="Floor"
              name="floor"
              value={
                formData.floor
              }
              onChange={
                handleChange
              }
            />

            <Input
              type="number"
              label="Capacity"
              name="capacity"
              value={String(
                formData.capacity
              )}
              onChange={
                handleChange
              }
            />

            <Input
              type="number"
              label="Hourly Rate"
              name="hourlyRate"
              value={String(
                formData.hourlyRate
              )}
              onChange={
                handleChange
              }
            />
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-medium mb-3">
              Amenities
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenitiesOptions.map(
                (item) => (
                  <label
                    key={
                      item
                    }
                    className="flex gap-2 items-center border rounded-xl p-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(
                        item
                      )}
                      onChange={() =>
                        handleCheckbox(
                          item
                        )
                      }
                    />
                    {item}
                  </label>
                )
              )}
            </div>
          </div>

        </ModalBody>

        <ModalFooter>
          <Button
            variant="light"
            onPress={() =>
              onOpenChange(
                false
              )
            }
          >
            Cancel
          </Button>

          <Button
            color="primary"
            onPress={
              handleSubmit
            }
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditRoomModal;