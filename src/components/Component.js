import { ListItem } from "@chakra-ui/react";
import React from "react";
import { useDrag } from "react-dnd";

const Component = ({ item, componentType, onDropcopmonent, index }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: componentType,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropcopmonent(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <ListItem
      p="2"
      borderRadius="md"
      boxShadow="md"
      mb="2"
      textAlign="center"
      ref={dragRef}
      bg={
        isDragging
          ? componentType === "componentType"
            ? "yellow.600"
            : "teal.400"
          : "white"
      }
      color={isDragging ? "white" : "black"}
    >
      {item.name}
    </ListItem>
  );
};

export default Component;
