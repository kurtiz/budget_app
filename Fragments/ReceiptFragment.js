import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import React, {useLayoutEffect, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Icon} from "@rneui/base";
import ReceiptComponent from "../Components/ReceiptComponent";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import {TextInput, TouchableRipple} from "react-native-paper";
import {getReceipts} from "../api/APIs";


const ReceiptFragment = () => {
    const navigation = useNavigation();
    // states
    const [donationType, setDonationType] = useState("Money");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [receipts, setReceipts] = useState([]);

    const fetchReceipts = async () => {
        let response = await getReceipts();
        setReceipts(response);
    };

    let [
        formValues,
        setFormValues
    ] = useState({
        name: "",
        money: true,
        item: false,
        items: "",
        quantity: "",
        paymentMethod: "Cash",
        amount: 0,
        address: "",
        date: "",
        time: ""
    });

    // ref
    const refRBSheet = useRef(null);
    const refDonationType = useRef(null);
    const refPaymentMethod = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false // hiding or disabling the default header from react-native
        });
        fetchReceipts().then();
    }, []);

    return (
        <SafeAreaView>
            <View className="bg-white pt-3">
                {/* Page Header */}
                <View className="flex-row items-center space-x-2 border-gray-200 border-b pb-3">
                    <View className="flex-1">
                        <Text className="ml-5 text-2xl font-bold">
                            Receipts
                        </Text>
                    </View>
                    <TouchableRipple
                        onPress={() => refRBSheet.current?.open()}
                        activeOpacity={0.9}
                        className="mr-5 rounded-md px-3 py-2 bg-blue-500">
                        <Icon type="ionicon" name="add-outline" color="white"/>
                    </TouchableRipple>
                </View>
                {/* End Page Header */}
            </View>
            <View className="bg-gray-50">
                <View className="flex-row items-center h-10 ml-5">
                    <Text className="text-lg font-bold">Total: </Text>
                    <Text className="text-lg font-bold">GHs. 2000.00</Text>
                </View>
            </View>

            {/* Receipts */}
            <ScrollView>
                {receipts?.reverse().map(
                    (
                        receipt,
                        index,
                        row
                    ) =>
                        (
                            index + 1 === row.length ?
                                <ReceiptComponent
                                    key={index}
                                    money = {receipt.data.money}
                                    item = {receipt.data.item}
                                    items = {receipt.data.items}
                                    quantity= {receipt.data.quantity}
                                    name={receipt.data.name}
                                    amount={receipt.data.amount}
                                    payment_method={receipt.data.paymentmethod}
                                    date={"2023-06-09"}
                                    time={receipt.data.time}
                                    classes="mb-24"
                                /> :
                                <ReceiptComponent
                                    key={index}
                                    money = {receipt.data.money}
                                    item = {receipt.data.item}
                                    items = {receipt.data.items}
                                    quantity= {receipt.data.quantity}
                                    name={receipt.data.name}
                                    amount={receipt.data.amount}
                                    payment_method={receipt.data.paymentmethod}
                                    date={"2023-06-09"}
                                    time={receipt.data.time}
                                />
                        ))}
            </ScrollView>
            {/* End Receipts */}

            {/* Add Receipt Modal */}
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                animationType="slide"
                height={450}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}>
                <View>
                    <View className="items-center text-center border-b border-gray-200">
                        <View className="flex-row items-center">
                            <Text className="flex-1 font-bold ml-4 text-2xl py-3">
                                Add Receipt
                            </Text>
                            <TouchableRipple
                                className="mr-3"
                                onPress={() => refRBSheet.current?.close()}
                            >
                                <Icon type="ionicon" size={35} name="close-outline"/>
                            </TouchableRipple>
                        </View>
                    </View>
                    <ScrollView>

                        <View className="flex-1 rounded-t-xl bg-white">
                            <TextInput
                                className="mx-2 mb-1 bg-gray-50"
                                placeholder="Name"
                                onChangeText={(textValue) => {
                                    formValues.name = textValue;
                                }}
                                label="Name"
                                mode="outlined"
                                outlineColor="gray"
                                activeOutlineColor="gray"
                            />
                            <TextInput
                                className="mx-2 mb-1 bg-gray-50"
                                placeholder="Name"
                                label="Donation Type"
                                mode="outlined"
                                value={donationType}
                                editable={false}
                                right={
                                    <TextInput.Icon
                                        icon="chevron-down"
                                        onPress={() => refDonationType.current?.open()}/>
                                }
                                outlineColor="gray"
                                activeOutlineColor="gray"
                            />
                            {(donationType === "Money") ?
                                <>
                                    <TextInput
                                        className="mx-2 mb-1 bg-gray-50"
                                        placeholder="Payment Method"
                                        label="Payment Method"
                                        mode="outlined"
                                        outlineColor="gray"
                                        editable={false}
                                        activeOutlineColor="gray"
                                        value={paymentMethod}
                                        right={
                                            <TextInput.Icon
                                                icon="chevron-down"
                                                onPress={() => refPaymentMethod.current?.open()}
                                            />
                                        }
                                    />
                                    <TextInput
                                        className="mx-2 mb-1 bg-gray-50"
                                        placeholder="Amount"
                                        label="Amount"
                                        mode="outlined"
                                        keyboardType="numeric"
                                        outlineColor="gray"
                                        activeOutlineColor="gray"
                                        onChangeText={(textValue) => {
                                            formValues.amount = textValue;
                                        }}
                                    />
                                </> : <>
                                    <TextInput
                                        className="mx-2 mb-1 bg-gray-50"
                                        placeholder="Item"
                                        label="Item"
                                        mode="outlined"
                                        outlineColor="gray"
                                        activeOutlineColor="gray"
                                        onChangeText={(textValue) => {
                                            formValues.items = textValue;
                                        }}
                                    />
                                    <TextInput
                                        className="mx-2 mb-1 bg-gray-50"
                                        placeholder="Quantity / Size"
                                        label="Quantity / Size"
                                        mode="outlined"
                                        outlineColor="gray"
                                        activeOutlineColor="gray"
                                        onChangeText={(textValue) => {
                                            formValues.quantity = textValue;
                                        }}
                                    />
                                </>
                            }
                            <TextInput
                                className="mx-2 mb-1 bg-gray-50"
                                placeholder="Address"
                                label="Address"
                                mode="outlined"
                                outlineColor="gray"
                                activeOutlineColor="gray"
                                onChangeText={(textValue) => {
                                    formValues.address = textValue;
                                }}
                            />
                            <TouchableRipple
                                rippleColor={"#bdbebe"}
                                onPress={
                                    () => {
                                        alert("sent");
                                        console.log(formValues);
                                        receipts.push(formValues);
                                        console.log(receipts)
                                    }
                                }
                                className="mb-1 mt-1 py-3 rounded-md px-3 mx-20 bg-blue-500" mode="contained">
                                <Text className="text-white text-lg text-center">Save</Text>
                            </TouchableRipple>
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>
            {/* End Add Receipt Modal */}

            {/* Donation Type Modal */}
            <RBSheet
                ref={refDonationType}
                closeOnDragDown={true}
                closeOnPressMask={false}
                animationType="slide"
                height={150}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}>
                <View>
                    <View className="rounded-t-xl bg-white">
                        <View>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        setDonationType("Money");
                                        formValues.money = true;
                                        formValues.item = false;
                                        refDonationType.current?.close();
                                    }
                                }
                                className="mt-1 border-b border-t border-gray-200 py-3 px-20">
                                <Text className="text-center text-lg">Money</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        setDonationType("Item");
                                        formValues.item = true;
                                        formValues.money = false;
                                        refDonationType.current?.close();
                                    }
                                }
                                className="mb-3 border-b border-gray-200 py-3 px-20">
                                <Text className="text-center text-lg">Item</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RBSheet>
            {/* End Donation Type Modal */}

            {/* Payment Method Modal */}
            <RBSheet
                ref={refPaymentMethod}
                closeOnDragDown={true}
                closeOnPressMask={false}
                animationType="slide"
                height={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}>
                <View>
                    <View className="rounded-t-xl bg-white">
                        <View>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        setPaymentMethod("Cash");
                                        formValues.paymentMethod = paymentMethod;
                                        refPaymentMethod.current?.close();
                                    }
                                }
                                className="mt-1 border-b border-t border-gray-200 py-3 px-20">
                                <Text className="text-center text-lg">Cash</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        setPaymentMethod("Cheque");
                                        formValues.paymentMethod = paymentMethod;
                                        refPaymentMethod.current?.close();
                                    }
                                }
                                className="mb-3 border-b border-gray-200 py-3 px-20">
                                <Text className="text-center text-lg">Cheque</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        setPaymentMethod("Credit Card");
                                        formValues.paymentMethod = paymentMethod;
                                        refPaymentMethod.current?.close();
                                    }
                                }
                                className="mb-3 border-b border-gray-200 py-3 px-20">
                                <Text className="text-center text-lg">Credit Card</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        setPaymentMethod("Mobile Money");
                                        formValues.paymentMethod = paymentMethod;
                                        refPaymentMethod.current?.close();
                                    }
                                }
                                className="mb-3 border-b border-gray-200 py-3 px-20">
                                <Text className="text-center text-lg">Mobile Money</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RBSheet>
            {/* End Payment Method Modal */}
        </SafeAreaView>
    );
};

export default ReceiptFragment;