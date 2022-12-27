import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

export default function PhoneInput({ onChange }) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<PhoneIcon color="gray.300" />}
      />
      <Input
        type="tel"
        placeholder="Phone number"
        name="number"
        onChange={onChange}
      />
    </InputGroup>
  );
}
