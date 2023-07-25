import styles from "./Sectors.module.css";

export default function Sectors({ data, colorTheme}){

    const colors = (() => {
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            
            if(colorTheme == "hot"){
                color += "FF";
                for (let i = 0; i < 4; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                };
                return color;

            }else if(colorTheme == "cold"){
                for (let i = 0; i < 4; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                };
                color += "FF";
                return color;

            }else{
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                };
                return color;
            };
        };

        return data.map(item => item = getRandomColor());

    })();

    console.log(colors)

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
                fill={colors[index % colors.length]}
                strokeWidth="1"
                stroke="#fff"
                />
            );
        });
    };

    return (
        <svg viewBox="0 0 100 100" width="200" height="200">
            {createSegments()}
        </svg>
    );
};
