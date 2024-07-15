import React, {ReactNode} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import camelCase from 'lodash/camelCase';


interface RowField {
  label: string;
  value: string;
}

interface RowProps {
  children?: ReactNode;
  fields: RowField[];
  flexDirection?: ViewStyle['flexDirection'];
  isLast?: boolean;
}

export const Row = ({
  children,
  fields,
  flexDirection = 'row',
  isLast,
}: RowProps) => (
  <View style={[styles.row, isLast && styles.rowLast, {flexDirection}]}>
    <View>
      {fields.map((field, index) => (
        <View
          style={[styles.row, fields.length - 1 === index && styles.rowLast]}
          key={camelCase(field.label)}>
          <Text style={styles.L1}>{field.label}</Text>
          <Text style={styles.P1}>{field.value}</Text>
        </View>
      ))}
    </View>

    {children}
  </View>
);

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },

  rowLast: {
    marginBottom: 0,
  },
  P1: {
    fontSize: 16,
    lineHeight: 20,
    color: 'dark',
  },

  P2: {
    fontSize: 14,
    lineHeight: 18,
    color: 'gray300',
  },

  /**
   * Labels
   */

  L1: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontWeight: '600',
    fontSize: 12,
    color: 'gray300',
  },
});
