/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid"

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imageLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;

        // map 배열 함수 , map 자료형 (key: value)

        // [].map() -> 치환 
        // map (함수호출-매개변수 넣을 수 있다) 함수정의 () => {}
        
        // []배열에서의 스프레드: 새 배열 만듦 
        // {}객체 스프레드 
        // 객체는 key 값이 같으면 마지막 값 적용 (key 값 중복 X)(=set자료형)
        // list, set, map 특징 알기

function ImageEx2() {
    const uploadFilesId = useRef(0);
    const [ oldFiles, setOldFiles ] = useState([]);
    const [ newFiles, setNewFiles ] = useState([]);
    const imgFileRef = useRef();

    useEffect(() => {
        setOldFiles(!localStorage.getItem("oldFiles") ? [] : JSON.parse(localStorage.getItem("oldFiles")));
    }, []);

    const handleFileChange = (e) => {
        console.log(e.target.files);
        const loadFiles = Array.from(e.target.files);
        // list: map, filter, foreach, reduce 못쓴다 ->  Array.from  (형 변환)

        // 취소버튼 눌렀을 때 밸류 비워주고 리턴
        if(loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        }

        // map : 파일을 객체로 바꾼다 
        const uploadFiles = loadFiles.map(file => {
            return {
                id: uploadFilesId.current += 1,
                percent: 0,
                originFile: file,
                url: ""
            };
        });

        uploadFilesId.current = 0;

        let promises = [];

        promises = uploadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                resolve(e.target.result);
            }

            fileReader.readAsDataURL(file.originFile);
        }));

        Promise.all(promises) 
        .then(result => {
            setNewFiles(result.map((dataUrl, index) => {
                return {
                    ...uploadFiles[index],
                    preview: dataUrl
                };
            }));
        });        
    }

    const handleImageUpload = () => {
        const promises = newFiles.map(file => new Promise(resolve => {
            const storageRef = ref(storage, `files/test/${uuid()}_${file.originFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file.originFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setNewFiles(newFiles.map(sFile => {
                        return sFile.id !== file.id ? sFile : {
                            ...sFile, 
                            percent: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        }
                    }));
                },
                (error) => {},
                () => {
                    getDownloadURL(storageRef).then(url => {
                        const newFile = {
                            ...file,
                            ["url"]: url        
                        }
                        resolve(newFile);
                    })
                }
            );
        }));

        Promise.all(promises)
        .then((newFile) => {
            setOldFiles(newFile);
            localStorage.setItem("oldFiles", JSON.stringify(newFile));
        }).then(() => {
            setNewFiles([]);
        });
    }

    return (
        <div css={layout}>
            {oldFiles?.map(file => 
                <div key={file.id} css={imageLayout}>
                    <img src={file.url} alt="" />
                </div>
            )}
            {newFiles?.map(file => 
                <>
                    <div key={file.id} css={imageLayout}>
                        <img src={file.preview} alt="" />
                    </div>
                    <Line percent={file.percent} strokeWidth={4} strokeColor={"#dbdbdb"}/>
                </>
            )}
            
            <input style={{display: "none"}} type="file" multiple={true} ref={imgFileRef} onChange={handleFileChange}/>
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx2;