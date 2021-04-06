import React from 'react'

import { Accordion } from '../components'
import faqsData from '../fixtures/faqs.json'

export function AccordionContainer () {
    return (
        <Accordion>
            <Accordion.Title>Freequently Asked Questions</Accordion.Title>
            <Accordion.Frame>
                {faqsData.map((item) => (
                    <Accordion.Item key={item.id}>
                        <Accordion.Header>{item.header}</Accordion.Header>
                        <Accordion.Body>{item.body}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion.Frame>
        </Accordion>
    )
}