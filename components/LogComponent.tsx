import React, { useState, useEffect } from 'react';
import { FlatList, Container, Header, Content, Button, Text, List, ListItem, Icon } from 'native-base';

const LogComponent = () => {
  const [log, setLog] = useState<string[]>([]);
  const [isLogging, setIsLogging] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isLogging) {
      intervalId = setInterval(() => {
        setLog(prevLog => [...prevLog, `Logging at ${new Date().toLocaleTimeString()}`]);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLogging]);

  const startLogging = () => {
    setIsLogging(true);
  };

  const stopLogging = () => {
    setIsLogging(false);
  };

  return (
   <>
        <Button onPress={startLogging} disabled={isLogging}>
          <Text>Start Logging</Text>
        </Button>
        <Button onPress={stopLogging} disabled={!isLogging}>
          <Text>Stop Logging</Text>
        </Button>
        <List>
          {log.map((item, index) => (
                <FlatList
                  data={log}
                  renderItem={({ item }) => (
                      <Text>{ item }</Text>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
          ))}
        </List>
    </>
  );
};

export default LogComponent;