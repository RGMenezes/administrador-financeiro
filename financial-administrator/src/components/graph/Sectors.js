import styles from "./Style.module.css";

export default function Sectors({ data, colorTheme = "blue"}){

    const colors = {
        red: ['#FF4D4D', '#FF8080', '#FFB2B2', '#FFD6D6'],
        green: ['#00CC66', '#66FF99', '#B2FFCC', '#E6FFED'],
        blue: ['#0099FF', '#66B2FF', '#B2D6FF', '#E6F2FF'],
        hot: ['#FF0000', '#FF5500', '#FFAA00', '#FFD400'],
        cold: ['#00FFFF', '#66FFFF', '#B2FFFF', '#E6FFFF']
    };

    const percentageData = (() => {
        const total = data.reduce((acc, item) => acc + item[1], 0);
        return data.map((item) => {
            const percentage = item[1] * (100 / total);
            return [item[0], percentage];
        });
    })();

    const calculateAngles = () => {
        const total = percentageData.reduce((acc, item) => acc + item[1], 0);
        let startAngle = 0;
        return percentageData.map((item) => {
            const percentage = (item[1] / total) * 100;
            const angle = (percentage * 360) / 100;
            const endAngle = startAngle + angle;
            const dataItem = {
                name: item[0],
                percentage,
                startAngle,
                endAngle,
            };
            startAngle = endAngle;
            return dataItem;
        });
    };


    const anglesData = calculateAngles();


    const createSegments = () => {
        const center = 50;
        const radius = 40;
        let cumulativePercentage = 0;

        return anglesData.map((item, index) => {
            const largeArcFlag = item.percentage > 50 ? 1 : 0;
            const x1 = center + radius * Math.cos((Math.PI / 180) * cumulativePercentage);
            const y1 = center + radius * Math.sin((Math.PI / 180) * cumulativePercentage);
            cumulativePercentage += item.percentage * 3.6; // Multiplicar por 3.6 para converter para graus
            const x2 = center + radius * Math.cos((Math.PI / 180) * cumulativePercentage);
            const y2 = center + radius * Math.sin((Math.PI / 180) * cumulativePercentage);

            const pathData = `M ${center},${center} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

            return (
                <path
                    key={index}
                    d={pathData}
                    fill={colors[colorTheme][index % colors[colorTheme].length]}
                    strokeWidth="1"
                    className={styles.graph}
                />
            );
        });
    };

    return (
        <svg viewBox="0 0 100 100" className={styles.container}>
            {createSegments()}
        </svg>
    );
};
