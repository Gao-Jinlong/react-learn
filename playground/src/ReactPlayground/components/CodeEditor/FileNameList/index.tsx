// import { useContext, useEffect, useState } from "react"
// import { PlaygroundContext } from "../../../PlaygroundContext"

import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import styles from "./index.module.scss";
import { FileNameItem } from "./FileNameItem";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../files";

// import { FileNameItem } from "./FileNameItem"

// export default function FileNameList() {
//     const {
//         files,
//         removeFile,
//         addFile,
//         updateFileName,
//         selectedFileName,
//         setSelectedFileName
//     } = useContext(PlaygroundContext)

//     const [tabs, setTabs] = useState([''])

//     useEffect(() => {
//         setTabs(Object.keys(files))
//     }, [files])

//     const handleEditComplete = (name: string, prevName: string) => {
//         updateFileName(prevName, name);
//         setSelectedFileName(name);

//         setCreating(false);
//     }

//     const [creating, setCreating] = useState(false);

//     const addTab = () => {
//         const newFileName = 'Comp' + Math.random().toString().slice(2,6) + '.tsx';
//         addFile(newFileName);
//         setSelectedFileName(newFileName);
//         setCreating(true)
//     }

//     const readonlyFileNames = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME];

//     return <div className={styles.tabs}>
//         {
//             tabs.map((item, index, arr) => (
//                 <FileNameItem
//                     key={item + index}
//                     value={item}
//                     readonly={readonlyFileNames.includes(item)}
//                     creating={creating && index === arr.length - 1}
//                     actived={selectedFileName === item}
//                     onClick={() => setSelectedFileName(item)}
//                     onEditComplete={(name: string) => handleEditComplete(name, item)}
//                     onRemove={() => handleRemove(item)}
//                 >
//                 </FileNameItem>
//             ))
//         }
//         <div className={styles.add} onClick={addTab}>
//             +
//         </div>
//     </div>
// }

export default function FileNameList() {
  const {
    files,
    setSelectedFileName,
    selectedFileName,
    updateFileName,
    removeFile,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState<string[]>([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const [creating, setCreating] = useState(false);

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);

    setCreating(false);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          readonly={readonlyFileNames.includes(item)}
          creating={creating && index === arr.length - 1}
          onClick={() => setSelectedFileName(item)}
          actived={selectedFileName === item}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          onRemove={() => handleRemove(item)}
        ></FileNameItem>
      ))}
    </div>
  );
}
