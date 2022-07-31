import { Container, Flex, Heading, List, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import Component from "./components/Component";

function App() {
  const [component, setcomponent] = useState([
    { name: "component 1" },
    { name: "component 2" },
    { name: "component 3" },
    { name: "component 4" },
    { name: "component 5" },
  ]);

  const [DropArea, setDropArea] = useState([]);

  const [{ isOver }, addToDropAreaRef] = useDrop({
    accept: "component",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  console.log(isOver);
  const [{ isOver: iscomponentOver }, removeFromDropArea] = useDrop({
    accept: "DragArea",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const moveComponentDropArea = (item) => {
    console.log(item);
    setcomponent((prev) => prev.filter((_, i) => item.index !== i));
    setDropArea((prev) => [...prev, item]);
  };
  const removeComponentfromDragArea = (item) => {
    setDropArea((prev) => prev.filter((_, i) => item.index !== i));
    setcomponent((prev) => [...prev, item]);
  };

  return (
    <Container maxW="800px">
      <Heading p="2" align="center" color="GrayText">
        React Drag & Drop
      </Heading>

      <Flex justify="space-between" height="90vh" align="center">
        <Stack width="300px">
          <Heading fontSize="3xl" color="yellow.800" textAlign="center">
            PLAYERS
          </Heading>
          <List
            bgGradient={
              iscomponentOver
                ? "linear(to-b, yellow.300, yellow.500)"
                : "linear(to-b, yellow.100, yellow.200)"
            }
            ref={removeFromDropArea}
            p="4"
            minH="70vh"
            boxShadow="xl"
            borderRadius="md"
          >
            {component.map((p, i) => (
              <Component
                item={p}
                key={i}
                componentType="component"
                onDropcopmonent={moveComponentDropArea}
                index={i}
              />
            ))}
          </List>
        </Stack>
        <Stack width="300px">
          <Heading fontSize="3xl" color="teal.800" textAlign="center">
            TEAM
          </Heading>
          <List
            bgGradient={
              isOver
                ? "linear(to-b, teal.300, teal.500)"
                : "linear(to-b, teal.100, teal.200)"
            }
            ref={addToDropAreaRef}
            minH="70vh"
            boxShadow="xl"
            borderRadius="md"
            p="4"
          >
            {DropArea.map((p, i) => (
              <Component
                item={p}
                key={i}
                index={i}
                componentType="component"
                onDropcopmonent={removeComponentfromDragArea}
              />
            ))}
          </List>
        </Stack>
      </Flex>
    </Container>
  );
}

export default App;
