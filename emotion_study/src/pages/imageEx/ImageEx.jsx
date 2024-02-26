/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { upload } from "@testing-library/user-event/dist/upload";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid";

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

function ImageEx(props) {
    const [ urls, setUrls ] = useState([]);
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ previews, setPreviews ] = useState([]);
    const [ progressPercent, setProgressPercent] = useState(0);
    const imgFileRef = useRef();

    useEffect(() => {
        setUrls(!localStorage.getItem("urls") ? [] : JSON.parse(localStorage.getItem("urls")));
    }, []);

    const handleImgFileChange = (e) => {
        console.log(e.target.files);

        // let ps = [
        //     new Promise(resolve => {
        //         console.log(1);
        //         setTimeout(() => resolve(1), 2000)
        //     }),
        //     new Promise(resolve => resolve(2)),
        //     new Promise(resolve => resolve(3))
        // ];
        // Promise.all(ps).then(result => console.log(result));

        const files = Array.from(e.target.files);
        if(files.length === 0) {
            imgFileRef.current.value = "";
            return;
        }

        setUploadFiles(files);

        let promises = [];
        // map으로 쓸 때
        promises = files.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();
            
            fileReader.onload = (e) => {
                console.log(e.target.result);
                resolve(e.target.result);
            }
            fileReader.readAsDataURL(file);
        }));
        // 같은 코드
        // for(let file of e.target.files) {
        //     promises = [...promises, new Promise((resolve) => {
        //         const fileReader = new FileReader();
                
        //         fileReader.onload = (e) => {
        //             console.log(e.target.result);
        //             resolve(e.target.result);
        //         }
        //         fileReader.readAsDataURL(file);
        //     })];
        // }
        
        Promise.all(promises)   // Promise.all : 동기로 동작
        .then(result => {
            console.log(result);
            setPreviews(result);
        });
    }

    const handleImageUpload = () => {
        const file = uploadFiles[0];
        console.log(uploadFiles);
        const storageRef = ref(storage, `files/test/${uuid()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgressPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
            },
            (error) => {},
            () => {     // 후처리
                getDownloadURL(storageRef)
                .then(urls => {
                    localStorage.setItem("urls", urls);
                    setUrls(urls);
                    setPreviews([]);
                })
            }
        );
    }

    return (
        <div css={layout}>
            {urls.map(url =>
                <div css={imageLayout} >
                    <img src={url} alt="" />
                </div>
            )}
            {previews.map((preview, index) =>
                <>
                    <div key={index} css={imageLayout} >
                        <img src={preview} alt="" />
                    </div>
                    <Line percent={progressPercent} strokeWidth={4} strokeColor={"#222222"}/>
                    {/* progressPercent - div의 크기에 따라 정해짐 */}
                </>
            )}
            <input style={{display: "none"}} type="file" ref={imgFileRef} onChange={handleImgFileChange} multiple={true} />
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx;