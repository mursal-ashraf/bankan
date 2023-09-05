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

    import('emailjs-com')
        .then(emailjs => {
            emailjs
                .send('service_rkmqc9w', 'template_h8ylqcg', templateParams, 'yo_kKRN2eG451iE_u')
                .then(response => {
                    console.log('Email successfully sent!', response);
                })
                .catch(err => {
                    console.error('Failed to send email. Error: ', err);
                });
        });
};
