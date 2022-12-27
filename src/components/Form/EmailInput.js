import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export default function EmailInput({ onChange }) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<EmailIcon color="gray.300" />}
      />
      <Input type="tel" placeholder="Email" name="email" onChange={onChange} />
    </InputGroup>
  );
}
