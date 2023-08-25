package com.phone.form;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Test {
	public static void changeValue(int arr[] ) {
		arr[0] = 1;
	}
	public static void main(String[] args) {
		int arr[] = {3,4,5};
		changeValue(arr);
		for (int i = 0; i < arr.length; i++) {
			System.out.println(arr[i]);
		}
		
		int a = 4;
		int b = a;
		System.out.println(a==b);
	}

}
