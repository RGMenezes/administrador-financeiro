import styles from "./Style.module.css";

export default function Columns({data, colorTheme = 'blue'}){
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

    return(
        <svg viewBox="0 0 400 300" className={styles.container}>
            {percentageData.map((item, index) => {
                const barWidth = 270 / percentageData.length;
                const barHeight = 100 - (400 / item[1]);
                const x = 33 + index * 330 / percentageData.length;
                const y = 300 - barHeight;
        
                return (
                    <rect
                        key={index}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={colors[colorTheme][index % colors[colorTheme].length]}
                        className={styles.graph}
                    />
                );
            })}
      </svg>
    );
};