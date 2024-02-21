import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage2(props) {
    // console.log(10.123456789.toFixed(2));

    // studentList 상태가 변할 때 총점, 평균

    const [ studentList, setStudentList ] = useState([]);
    const [ studentValue, setStudentValue ] = useState({
        id: "",
        name: "",
        score: ""
    })

    const [ scoreData, setScoreData ] = useState({
        total: 0,
        avg: 0
    })

    const [ updateId, setUpdateId ] = useState(0);

    const  staticId = useRef(0);

    useEffect(() => {
        const total = studentList.reduce((result, student) => result + student.score, 0);
        const avg = studentList.length === 0 ? 0 : total / studentList.length; 
        // total / studentList.length; : (0 나누기 0) NaN 값이 나옴

        setScoreData ({
            total,
            avg
        });

        console.log(studentList);
    }, [studentList]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentValue({
            ...studentValue,
            [name]: value
        })
    }

    const handleAddClick = () => {
        const student = {
            id: staticId.current += 1,
            name: studentValue.name,
            score: parseInt(studentValue.score)
        }
        setStudentList([...studentList, student]);
    }

    const handleUpdateClick = (id) => {
        setUpdateId(id);
        setStudentValue(studentList.filter(student => student.id === id)[0]);
    }

    const handleDeleteClick = (id) => {
        setStudentList([...studentList.filter(student => student.id != id)]);
    }

    const handleUpdateSubmitClick = () => {
        const findIndex = studentList.indexOf(studentList.filter(student => student.id === updateId)[0])
        const updateStudentList = [...studentList];
        updateStudentList[findIndex] = studentValue;
        setStudentList(updateStudentList);
        handleCancelClick();
    }

    const handleCancelClick = () => {
        setUpdateId(0);
        setStudentValue({
            id: "",
            name: "",
            score: ""
        });
    }

    
    return (
        <div>
            <div>
                <input type="text" name='id' disabled={true} value={studentValue.id} placeholder='ID'/>
                <input type="text" name='name' onChange={handleInputChange} value={studentValue.name} placeholder='이름'/>
                <input type="text" name='score' onChange={handleInputChange} value={studentValue.score} placeholder='점수'/>
                <button onClick={handleAddClick}>추가</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map(student => {
                    return <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.score}</td>
                        <td>
                            {
                                updateId !== student.id
                                ? <button onClick={() => {handleUpdateClick(student.id)}}>수정</button>
                                : <button onClick={handleUpdateSubmitClick}>확인</button>

                            }
                        </td>
                        <td>
                            {
                                updateId !== student.id
                                ? <button onClick={() => {handleDeleteClick(student.id)}}>삭제</button>
                                : <button onClick={handleCancelClick}>취소</button>
                            }
                        </td>
                    </tr>

                    })}

                </tbody>
                <tfoot>
                    <tr>
                        <th>총점</th>
                        <th colSpan={2}>{scoreData.total}</th>
                    </tr>
                    <tr>
                        <th>평균</th>
                        <th colSpan={2}>{scoreData.avg.toFixed(2)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default StudentArrayPage2;

// commit test3