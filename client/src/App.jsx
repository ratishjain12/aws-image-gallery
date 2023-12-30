import { useEffect, useState } from "react";
import { SimpleGrid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import {
  Button,
  Image,
  Center,
  Flex,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const validType = ["image/png", "image/jpeg", "image/jpg"];
  const { colorMode, toggleColorMode } = useColorMode();

  const handleUpload = (e) => {
    e.preventDefault();
    if (!validType.find((type) => type === e.target.files[0].type)) {
      setError("Invalid file selected please select an image");
      return;
    }
    setFile(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
    setError("");
  };

  const uploadImage = async () => {
    const form = new FormData();
    form.append("userid", "xeA124s");
    form.append("image", file);

    await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, form);
    setUrl("");
    setFile(null);
    window.location.reload();
  };
  const fetchData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}`);
    const response = res.data;
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"2xl"}>AWS Gallery</Text>
        <IconButton
          variant="outline"
          icon={colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
      <Input
        placeholder="Basic usage"
        hidden
        id="file-upload"
        type="file"
        onChange={handleUpload}
      />
      <Center m="3">
        {url && (
          <Image
            borderRadius="12px"
            objectFit={"fill"}
            src={url}
            alt="preview"
            width={"300px"}
            height={"220px"}
          />
        )}
      </Center>
      {url ? (
        <Center>
          <Flex gap="5px">
            <Button colorScheme="teal" onClick={uploadImage}>
              Upload
            </Button>
            <IconButton
              colorScheme="red"
              icon={<CloseIcon />}
              onClick={() => setUrl("")}
            />
          </Flex>
        </Center>
      ) : (
        <Button
          as="label"
          htmlFor="file-upload"
          variant="outline"
          colorScheme="teal"
        >
          Upload Image
        </Button>
      )}

      {error && (
        <Text color={"red"} fontSize={"xl"}>
          {error}
        </Text>
      )}
      <Text fontSize={"2xl"} align={"center"} fontFamily={"arial"} mt={"3"}>
        Images
      </Text>

      <Center>
        <SimpleGrid columns={[1, 2, 3]} gap={4}>
          {data &&
            data.map((item) => {
              return (
                <GridItem key={item._id}>
                  <Image
                    src={item.url}
                    grid
                    objectFit={"fill"}
                    alt="images"
                    gridAutoFlow={"true"}
                    w={"320px"}
                    h={"250px"}
                    mt={"4"}
                    borderRadius={"12"}
                  />
                </GridItem>
              );
            })}
        </SimpleGrid>
      </Center>
    </div>
  );
}

export default App;
