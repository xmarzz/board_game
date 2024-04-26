import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Text, Line } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ChessBoard = () => {
 const screenWidth = Dimensions.get('window').width;
 const boxSize = (screenWidth - 40) / 8;
 const padding = 20;
 const [rookPosition, setRookPosition] = useState({ x: 7 * boxSize + padding, y: padding });

 const animatedPosition = useSharedValue(rookPosition);

 useEffect(() => {
    const moveRook = async () => {
      for (let i = 0; i < 8; i++) {
        await new Promise((resolve) =>
          setTimeout(() => {
            const newPosition = { x: rookPosition.x - boxSize, y: rookPosition.y + boxSize };
            setRookPosition(newPosition);
            animatedPosition.value = withTiming(newPosition, { duration: 30000 / 8 });
            resolve();
          }, 30000 / 8)
        );
      }
    };

    moveRook();
 }, [rookPosition]);

 const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedPosition.value.x }, { translateY: animatedPosition.value.y }],
    };
 });

 const renderSquare = (color, x, y) => {
    const fill = color === 'white' ? '#FFFFFF' : '#8B4513';
    return (
      <Rect
        key={`${x}-${y}`}
        x={x * boxSize + padding}
        y={y * boxSize + padding}
        width={boxSize}
        height={boxSize}
        fill={fill}
      />
    );
 };

 const renderGridLines = () => {
    let lines = [];

    for (let i = 0; i < 4; i++) {
      lines.push(
        <Line
          key={`extra-horizontal-top-${i}`}
          x1={padding}
          y1={i * boxSize + padding}
          x2={screenWidth - padding}
          y2={i * boxSize + padding}
          stroke="black"
          strokeWidth="1"
        />
      );
    }

    for (let i = 4; i < 15; i++) {
      lines.push(
        <Line
          key={`horizontal-${i}`}
          x1={padding}
          y1={i * boxSize + padding}
          x2={screenWidth - padding}
          y2={i * boxSize + padding}
          stroke="black"
          strokeWidth="1"
        />
      );
    }

    for (let i = 15; i < 19; i++) {
      lines.push(
        <Line
          key={`extra-horizontal-bottom-${i}`}
          x1={padding}
          y1={i * boxSize + padding}
          x2={screenWidth - padding}
          y2={i * boxSize + padding}
          stroke="black"
          strokeWidth="1"
        />
      );
    }

    for (let i = 0; i < 9; i++) {
      lines.push(
        <Line
          key={`vertical-${i}`}
          x1={i * boxSize + padding}
          y1={padding}
          x2={i * boxSize + padding}
          y2={screenWidth - padding}
          stroke="black"
          strokeWidth="1"
        />
      );
    }
    return lines;
 };

 const renderLabels = () => {
    let labels = [];
    for (let i = 0; i < 8; i++) {
      labels.push(
        <Text key={`label-${i}`} x={i * boxSize + boxSize / 2 + padding} y={-10} textAnchor="middle">
          {String.fromCharCode(97 + i)}
        </Text>
      );
    }
    for (let i = 0; i < 8; i++) {
      labels.push(
        <Text key={`label-${i + 8}`} x={-10} y={i * boxSize + boxSize / 2 + padding} textAnchor="middle" transform={`rotate(-90 ${-10} ${i * boxSize + boxSize / 2 + padding})`}>
          {i + 1}
        </Text>
      );
    }
    return labels;
 };

 return (
    <View style={styles.container}>
      <Svg style={styles.svg} viewBox={`0 0 ${screenWidth} ${screenWidth}`}>
        {renderGridLines()}
        {renderLabels()}
        {Array.from({ length: 8 }, (_, x) =>
          Array.from({ length: 8 }, (_, y) => renderSquare((x + y) % 2 === 0 ? 'white' : 'black', x, y))
        ).flat()}
        <Animated.G style={animatedStyle}>
          <Rect width={boxSize} height={boxSize} fill="black" /> 
        </Animated.G>
      </Svg>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 svg: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
 },
});

export default ChessBoard;


