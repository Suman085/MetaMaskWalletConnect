import {
  Heading,
  CardHeader,
  VStack,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  CardProps,
} from "@chakra-ui/react";
import React from "react";

//1 NEP = 3BUSD
const ConverterCard = (props: CardProps) => {
  const [nepAmount, setNEPAmount] = React.useState("0");
  const [busdAmount, setBUSDAmount] = React.useState("0");
  const handleNEPChanged = (valueAsString: string, nepValue: number) => {
    const converted = (nepValue * 3).toString();
    setNEPAmount(valueAsString);
    setBUSDAmount(parseFloat(converted).toFixed(2));
  };

  const handleBUSDChanged = (busdValueString: string, busdValue: number) => {
    const converted = (busdValue / 3).toString();
    setBUSDAmount(busdValueString);
    setNEPAmount(parseFloat(converted).toFixed(2));
  };

  return (
    <Card variant="outline" w="100%" {...props}>
      <CardHeader>
        <Heading color="orange.400" size="lg">
          Currency converter
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack as="form">
          <FormControl>
            <FormLabel>NEP</FormLabel>
            <NumberInput
              value={nepAmount}
              precision={2}
              step={1}
              onChange={handleNEPChanged}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>BUSD</FormLabel>
            <NumberInput
              value={busdAmount}
              precision={2}
              step={1}
              onChange={handleBUSDChanged}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ConverterCard;
