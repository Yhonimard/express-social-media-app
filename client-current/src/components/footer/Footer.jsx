import Icon from '@/assets/icon';
import { ActionIcon, Container, Group, Title, rem } from '@mantine/core';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Title order={4}>YHONIMARD</Title>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Icon.Twitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Icon.WhatsApp style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Icon.Instagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer