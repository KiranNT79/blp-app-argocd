import { useEffect, useState } from 'react';
import { apiTitle, helloText, welcomeText } from '../../constants/constants';
import './Dashboard.scss';
// @ts-ignore
import { initUser, getUser$ } from '@dlcm/cc-ui-utils-store-user';
import React from 'react';
import { firstValueFrom } from 'rxjs';
import logo from '../../assets/logo.png';
import 'primereact/resources/themes/saga-blue/theme.css';

const Dashboard = () => {

    const [username, setUsername] = useState(false);
    const [suData, setSuData] = useState([]);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'moduleName', header: 'Module Name' },
        { field: 'releaseCount', header: 'Release Count' },
        { field: 'status', header: 'Status' },
        { field: 'ownerName', header: 'Owner' }
    ];

    useEffect(() => {
        async function fetchUser() {
            const user: any = await firstValueFrom(getUser$);
            if (user === false) {
                initiateUser();
            }
            setUsername(JSON.parse(user).name);
        }
        async function initiateUser() {
            await initUser();
            fetchUser();
        }

        const fetchAEC = async () => {
            fetch('/api/ae-container/software-projects')
                .then((response) => response?.json())
                .then((json) => {
                    let swus = [];
                    if (json.length) {
                        swus = json?.map((swu) => {
                            return {
                                ...swu,
                                ownerName: swu.owner.fullName
                            }
                        })
                    }
                    setSuData(swus);
                }).catch(() => {
                    setSuData([]);
                    console.log(" Error occured! ")
                });
        }

        fetchUser();
        fetchAEC();
    }, [username]);



    return (
        <div className="card-level-1 content mx-6 mt-6 dashboard-container">
            <div className="flex-row">
                <div className="user-details">
                    <img src={logo} className="logo" alt="logo" />
                    <div className="user-info">{helloText}, {username}</div>
                    <br />
                    <div className="welcome-text">{welcomeText}</div>
                </div>

                <div className="separator"></div>

                <div className="flex flex-column info-container">
                    <h1>{apiTitle}</h1>
                    <div className="mt-6">
                        <div className="data-table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        {columns.map((col) => (
                                            <th key={col.field}>{col.header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {suData.length === 0 ?
                                        "No rows to show"
                                        : suData.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {columns.map((col) => (
                                                    <td key={col.field}>{row[col.field]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default Dashboard;


