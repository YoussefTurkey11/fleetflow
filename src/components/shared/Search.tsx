import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <InputGroup className="hidden md:flex w-87.5">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-start">
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default Search;
