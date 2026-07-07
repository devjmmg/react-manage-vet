export default function Alert(props) {

    const { message, type, className } = props;

    if (!message) return null;

    return (
        <p className={`mt-1 font-medium ${type === "error" ? 'text-red-500' : 'text-green-500'} ${className}`}>
            {message}
        </p>
    );
}