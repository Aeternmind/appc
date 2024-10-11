document.getElementById("calculateBtn").addEventListener("click", function() {
    const time = document.getElementById("time").value;
    const distance = parseFloat(document.getElementById("distance").value);
    const pace = document.getElementById("pace").value;

    let resultText = "";

    // Función para convertir string de tiempo (hh:mm:ss) a segundos
    function timeToSeconds(timeStr) {
        const parts = timeStr.split(':');
        return (+parts[0]) * 3600 + (+parts[1]) * 60 + (+parts[2]);
    }

    // Función para convertir pace (mm:ss) a segundos
    function paceToSeconds(paceStr) {
        const parts = paceStr.split(':');
        return (+parts[0]) * 60 + (+parts[1]);
    }

    // Función para convertir segundos a formato hh:mm:ss
    function secondsToTime(secs) {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs % 3600) / 60);
        const seconds = secs % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Función para convertir segundos a formato mm:ss
    function secondsToPace(secs) {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    if (!time && distance && pace) {
        // Calcular el tiempo
        const paceSeconds = paceToSeconds(pace);
        const totalSeconds = paceSeconds * distance;
        resultText = `Tiempo: ${secondsToTime(totalSeconds)}`;
    } else if (time && distance && !pace) {
        // Calcular el pace
        const timeSeconds = timeToSeconds(time);
        const paceSeconds = timeSeconds / distance;
        resultText = `Pace: ${secondsToPace(paceSeconds)} min/km`;
    } else if (time && !distance && pace) {
        // Calcular la distancia
        const timeSeconds = timeToSeconds(time);
        const paceSeconds = paceToSeconds(pace);
        const distanceCalc = timeSeconds / paceSeconds;
        resultText = `Distancia: ${distanceCalc.toFixed(2)} km`;
    } else {
        resultText = "Por favor, ingrese dos valores para calcular el tercero.";
    }

    document.getElementById("result").innerText = resultText;
});
