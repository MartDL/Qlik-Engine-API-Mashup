import React from 'react';
import Chart from '../chart/Chart';
import styled from 'styled-components';
import HeaderContainer from '../components/Header'


const Dashboard = () => {

    return (
        <DashboardContainer>
            <DashboardDiv>
                <SideBarDiv>
                    <p>sidebar</p>
                </SideBarDiv>
                <ChartDiv>
                    <div className="dash-title">
                    <Chart
							type="linechart"
							measures={[
								{
									formula: "Sum ([Budget Amount])",
									label: "budget",
									sorting: { qSortByNumeric: -1 },
                                },
                                {
									formula: "Sum ([Actual Amount])",
									label: "actual amount",
									sorting: { qSortByNumeric: -1 },
								},
							]}
							dimensions={[{ field: "Product Group Desc", excludeNull: true }]}
							className="chart"
						/>
                    {/* <HeaderContainer /> */}
                    </div>
                    <div className="mid-chart1">
                        <Chart objectId="qEqbcMm" type="vertbar"/>
                    </div>
                    <div className="mid-chart2">
                        <Chart objectId="WJYuPN" type="barchart"/>
                    </div>
                    <div className="bottom-chart1"></div>
                    <div className="bottom-chart2">
                    {/* <Chart
							type="linechart"
							measures={[
								{
									formula: "Sum ([Budget Amount])",
									label: "budget",
									// sorting: { qSortByNumeric: -1 },
                                },
                                {
									formula: "Sum ([Actual Amount])",
									label: "actual amount",
									// sorting: { qSortByNumeric: -1 },
								},
							]}
							dimensions={[{ field: "Product Group Desc", excludeNull: true }]}
							className="chart"
						/> */}
                    </div>
                    <div className="bottom-chart3"></div>
                </ChartDiv>
            </DashboardDiv>
        </DashboardContainer>
    )
}

export default Dashboard;



const DashboardContainer = styled.div`
    display: flex;
    align-items: center;
    background-image: linear-gradient(#00BEF1 , #00F1C7);
    height: 100vh;
`
const DashboardDiv = styled.div`
    display: flex;
    border-radius: 20px;
    height: 90vh;
    width: 100vw;
    margin-left: 5%;
    margin-right: 5%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const SideBarDiv = styled.div`
    display: flex;
    background-image: linear-gradient(45deg, #00BEF1, #00BEF1, #00F1C7 );
    height: 100%;
    width: 20%;
    min-width: 260px;
    border-radius: 20px 0 0 20px;
    align-items: start-end;
    justify-content: start-end;
`
const ChartDiv = styled.div`
background-image: linear-gradient(to right, white, white, white, #C5C5C5 );
justify-content: center;
align-items: center;
color: black;
border-radius: 0 20px 20px 0;
flex: 1;
display: flex;
flex-flow: row wrap;
min-width: 1100px;
min-height: 80vh;
// border: 2px solid green;

    .dash-title {
        display: flex;
        margin: 3px;
        align-items: center;
        justify-content: center;
        order: 1;
        flex: 0 1 91%;
        // border: 1px solid blue;
        height: 200px;
        box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.5);
        border-radius: 10px;
        // border: 1px solid red;
    }

    .mid-chart1 {
        margin: 3px;
        order: 2;
        flex: 0 1 35%;
        // border: 1px solid blue;
        min-height: 200px;
        min-width: 200px;
        box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.5);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mid-chart2 {
        margin: 3px;
        order: 3;
        min-height: 200px;
        width: 600px;
        flex:  0 1 55%;
        //border: 1px solid blue;
        box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.5);
        border-radius: 20px;
    }

    .bottom-chart1 {
        height: 210px;
        min-width: 150px;
        margin: 3px;
        order: 4;
        flex: 0 1 30%;
       // border: 1px solid blue;
       box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.5);
       border-radius: 20px;
    }

    .bottom-chart2 {
        height: 210px;
        min-width: 150px;
        margin: 3px;
        order: 5;
        flex: 0 1 30%;
       // border: 1px solid blue;
       box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.5);
       border-radius: 20px;
    }

    .bottom-chart3 {
        height: 210px;
        min-width: 150px;
        margin: 3px;
        order: 6;
        flex: 0 1 30%;
    //    border: 1px solid blue;
       box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.5);
       border-radius: 20px;
    }
`
