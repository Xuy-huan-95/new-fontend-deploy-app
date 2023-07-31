import { useEffect, useState } from "react";
import './CountDown.scss';

const CountDownAnimation = (props) => {
    const { timeLeft, TIME_LIMIT, setTimeLeft } = props
    const FULL_DASH_ARRAY = 283;
    // thời gian nền
    const WARNING_THRESHOLD = 100;
    // thời gian chuyển màu vàng
    const ALERT_THRESHOLD = 10;
    // thời gian chuyển màu đỏ

    const COLOR_CODES = {
        // khai báo màu
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };


    let remainingPathColor = COLOR_CODES.info.color;
    // set màu mặc định của đồng hồ


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            // set số giây có 0 đứng trước
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }



    const setRemainingPathColor = (timeLeft) => {
        // set màu theo thời gian
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    }

    const calculateTimeFraction = () => {
        // hàm tính toán thơi gian
        const rawTimeFraction = (timeLeft - 1) / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    const setCircleDasharray = () => {
        // set thay đổi màu nền
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }


    useEffect(() => {
        if (timeLeft === 0) {
            return;
        }
        const timer = setInterval(() => {

            const currentTime = timeLeft - 1;
            setTimeLeft(currentTime);
            setCircleDasharray();
            setRemainingPathColor(currentTime);
            // truyền thời gian thực vào hàm set thời gian

        }, 1000)

        return () => {
            // cứ khi hàm time chạy xong là xóa cái timelefft cũ
            clearInterval(timer);
        }

    }, [timeLeft]);

    return (
        <div className="count-down-animation-container">
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                        <path
                            id="base-timer-path-remaining"
                            stroke-dasharray="283"
                            className={`base-timer__path-remaining ${remainingPathColor}`}
                            d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0
                                "
                        ></path>
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">
                    {formatTime(timeLeft)}</span>
            </div>
        </div>
    )
}

export default CountDownAnimation;