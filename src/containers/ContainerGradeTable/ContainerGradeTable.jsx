import React, { useState, useEffect } from 'react'
import { GradeTable } from '../GradeTable/GradeTable'
import {GradeTableForStudent} from '../GradeTableForStudent/GradeTableForStudent'
import { apiClasses } from '../../services/api';
import { useParams } from 'react-router-dom';

export const ContainerGradeTable = () => {
    const [isTeacher, setIsTeacher] = useState(null);
    let { id } = useParams()

    useEffect(async () => {
        let isTeacher = await CheckIsTeacher(id)
        setIsTeacher(isTeacher)
    }, [])

    const CheckIsTeacher = async (id) => {
        let d = await apiClasses.getClassDetail(id);
        if (d.data.isTeacher) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div>
            {
                isTeacher !== null && isTeacher ?
                <GradeTable/> :
                    <div></div>
            }
        </div>

    )
}