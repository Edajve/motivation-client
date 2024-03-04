export function getCurrentDateTimeString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return dateTimeString;
}

/**
     * 
     * @param submissionDate when the book was added
     * @param currentData todays date
     * @returns This function first checks if the submission date is valid.
     * Then it calculates the time difference in milliseconds between the
     * current date and the submission date. After that, it converts the
     * milliseconds into days, hours, minutes, and seconds.
     * Finally, it formats these values into a human-readable
     * string representing the duration of time.
     */
export const calculateDurationOfBook = (submissionDate: string | undefined, currentData: string): string => {
    if (!submissionDate) {
        return "Invalid submission date";
    }

    const startDate = new Date(submissionDate);
    const currentDate = new Date(currentData);

    const durationMs = currentDate.getTime() - startDate.getTime();

    // Convert milliseconds to days, hours, minutes, seconds
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = 60 * millisecondsPerSecond;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;

    const days = Math.floor(durationMs / millisecondsPerDay);
    const hours = Math.floor((durationMs % millisecondsPerDay) / millisecondsPerHour);
    const minutes = Math.floor((durationMs % millisecondsPerHour) / millisecondsPerMinute);
    const seconds = Math.floor((durationMs % millisecondsPerMinute) / millisecondsPerSecond);

    // Format the duration
    let durationString = "";
    if (days > 0) {
        durationString += `${days} day${days > 1 ? 's' : ''}, `;
    }
    if (hours > 0) {
        durationString += `${hours} hour${hours > 1 ? 's' : ''}, `;
    }
    if (minutes > 0) {
        durationString += `${minutes} minute${minutes > 1 ? 's' : ''}, `;
    }
    if (seconds > 0) {
        durationString += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    // Remove trailing comma and space
    durationString = durationString.replace(/, $/, '');

    return durationString || "Less than a second";
}