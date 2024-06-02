import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CircleChart({ softcap, hardcap, cap }) {

    const [position, setPosition] = useState(0);
    const [position2, setPosition2] = useState(0);

    useEffect(() => {
        const percent = Math.floor(cap / hardcap * 100);
        setPosition(getPositionCSS(percent));

        const percent2 = Math.floor(softcap / hardcap * 100);
        setPosition2(getPosition2CSS(percent2));
    }, [cap])

    const getPositionCSS = (percent) => {
        if (percent > 86) {
            return "md:top-[200px] md:ml-[350px]";
        } else if (percent > 75) {
            return "md:top-[120px] md:ml-[250px]";
        } else if (percent > 55) {
            return "md:top-[60px] md:ml-[120px]";
        } else if (percent > 45) {
            return "md:top-[60px] md:-ml-[100px]";
        } else if (percent > 30) {
            return "md:top-[80px] md:-ml-[170px]";
        } else if (percent > 15) {
            return "md:top-[140px] md:-ml-[320px]";
        } else {
            return "md:top-[200px] md:-ml-[380px]";
        }
    }

    const getPosition2CSS = (percent) => {
        if (percent > 80) {
            return "top-[160px] ml-[190px] md:top-[140px] md:ml-[670px]";
        } else if (percent > 70) {
            return "top-[120px] ml-[120px] md:top-[50px] md:ml-[560px]";
        } else if (percent > 59) {
            return "top-[120px] ml-[120px] md:-top-[30px] md:ml-[350px]";
        } else if (percent > 50) {
            return "top-[100px] ml-[0px] md:-top-[70px] md:ml-[50px]";
        } else {
            return "top-[100px] ml-[0px] md:-top-[70px] md:ml-[50px]";
        }
    }

    const data = {
        labels: ["Soft Cap", "Hard Cap"],
        datasets: [
            {
                data: [cap, hardcap - cap],
                backgroundColor: (context) => {
                    const screenWidth = window.innerWidth - 350;
                    let left = 150 + Math.round(screenWidth / 3.125);
                    let top = Math.round(screenWidth / 6.4);
                    const gradient = context.chart.ctx.createLinearGradient(left, 100, top, 150);

                    gradient.addColorStop(0, '#FF3E14');
                    gradient.addColorStop(1, '#49529E');

                    return [gradient, "transparent"];
                },
                borderWidth: 0,
                borderRadius: () => {
                    if (window.innerWidth < 650) {
                        const screenWidth = window.innerWidth - 350;
                        return Math.floor(screenWidth / 37.5) + 8;
                    }
                    return 16;
                },
            },
            {
                data: [hardcap + cap],
                backgroundColor: 'transparent',
                borderColor: '#45454570',
                borderWidth: () => {
                    if (window.innerWidth < 650) {
                        const screenWidth = window.innerWidth - 350;
                        return Math.round(screenWidth / 20) + 15;
                    }
                    return 30;
                },
                borderRadius: 1,
                cutout: '90%',
                circumference: 174,
                rotation: -87,
            },

        ],
    };

    const options = {
        circumference: 180,
        rotation: -90,
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        animation: false,

        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
        },
    };

    const data2 = {
        labels: ["Soft Cap", "Hard Cap"],
        datasets: [
            {
                data: [softcap - hardcap / 250, hardcap / 250, hardcap - softcap],
                backgroundColor: ["transparent", "white", "transparent"],
                borderWidth: 0,
            }
        ],
    };

    const options2 = {
        circumference: 180,
        rotation: -90,
        cutout: '85%',
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
        },
    };

    return (
        <div className={`w-full h-[300px] flex justify-center relative`} >
            <div className='relative w-full h-[300px] '>
                <div className='absolute w-full h-full'>
                    <Doughnut data={data} options={options} />
                </div>
                <div className='absolute w-full h-full'>
                    <Doughnut data={data2} options={options2} />
                </div>
            </div>
            <div className="absolute h-[300px] flex items-center text-center sm:mt-[60px] mt-[30px] md:mt-[60px] text-[#A84756] text-[20px] sm:text-[34px] md:text-[34px] font-bold text-shadow-dark">Investment<br />Progress</div>
            <div className="absolute text-center sm:top-[260px] sm:ml-[700px] md:top-[260px] md:ml-[750px] top-[200px] ml-[230px]">
                <div className='text-[16px] sm:text-[20px] md:text-[20px] text-[#d0d0d0]'>Hard Cap</div>
                <div className='text-[16px] sm:text-[20px] md:text-[20px] font-bold mt-[8px]'>{hardcap}ETH</div>
            </div>
            <div className={`absolute text-center md:block flex items-center justify-center gap-3 ${position}`}>
                <div className='text-[16px] sm:text-[20px] md:text-[20px] text-[#d0d0d0] mt-[8px]'>Raised</div>
                <div className='text-[16px] sm:text-[20px] md:text-[20px] font-bold mt-[8px]'>{cap}ETH</div>
            </div>
            <div className={`absolute text-center ${position2}`}>
                <div className='text-[16px] sm:text-[20px] md:text-[20px] text-[#d0d0d0]'>Soft Cap</div>
                <div className='text-[16px] sm:text-[20px] md:text-[20px] font-bold mt-[8px]'>{softcap}ETH</div>
            </div>
        </div >
    );
}
