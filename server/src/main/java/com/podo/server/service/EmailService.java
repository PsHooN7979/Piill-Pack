package com.podo.server.service;

import com.podo.server.exception.EmailSendException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendEmail(String toEmail, String title, String text){
        SimpleMailMessage emailForm = createEmailForm(toEmail, title, text);

        log.info("Sending email to {}", toEmail);

        try{
            javaMailSender.send(emailForm);
            log.info("Email successfully sent to {}", toEmail);
        } catch (RuntimeException e){
            log.error("Failed to send email to {}: {}", toEmail, e.getMessage());
            throw new EmailSendException("Unable to send email to " + toEmail, e);  // Custom exception
        }
    }

    private SimpleMailMessage createEmailForm(String toEmail, String title, String text){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }
}
