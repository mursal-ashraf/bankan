import emailjs from 'emailjs-com';
export const sendEmailNotification = (
    to_email: string,
    to_name: string,
    subject: string,
    message: string
): void => {
    const templateParams = {
        to_email,
        to_name,
        subject,
        message,
    };
    const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const private_id = import.meta.env.VITE_EMAILJS_PRIVATE_ID;
    import('emailjs-com')
        .then(emailjs => {
            emailjs
                // template could be edited in emailjs web
                // Account : kanban.official@gmail.com
                // Password : kanbanboard
                .send(service_id, 'template_h8ylqcg', templateParams, private_id)
                .then(response => {
                    console.log('Email successfully sent!', response);
                })
                .catch(err => {
                    console.error('Failed to send email. Error: ', err);
                });
        });
};
