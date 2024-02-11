import { ReactNode, useState } from "react";
import AddEntry from "@/components/AddEntry";
import InputField from "@/components/InputField";
import { useFileOps } from "@/hooks/useFileOps";
import EntryList from "@/components/EntryList";
import BlankSpace from "@/components/BlankSpace";
import ScrollBar from "@/helpers/ScrollBar";

export default function App() {
  const [inputFieldElement, setInputFieldElement] = useState<ReactNode>(null)
  const { children, setChildren } = useFileOps()

  return (<>
    <ScrollBar />
    <EntryList setChildren={setChildren} inputFieldElement={inputFieldElement}>{ children }</EntryList>
    <AddEntry
      spawnInputField={() => { setInputFieldElement(
        <InputField setChildren={setChildren} killFunction={() => setInputFieldElement(null)}>{ children }</InputField>
      ) }}
    />
    <BlankSpace />
  </>)
}
