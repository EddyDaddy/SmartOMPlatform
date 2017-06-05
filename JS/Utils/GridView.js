/**
 * Created by demon on 2017/6/2.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableWithoutFeedback
} from 'react-native';
import Utils from './Utils';
const styles = StyleSheet.create({
    contentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
});
export default class GridView extends Component {
    constructor(props) {
        super(props);
        let dividerHorizontal = this.props.dividerHorizontal ? this.props.dividerHorizontal : 0;
        let column = this.props.column ? this.props.column : 2;
        let emptyDataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2)=>r1 != r2
        })
        this.state = {
            'dataSource': emptyDataSource,
            'column': column,
            'viewWidth': Utils.size.width,
            'dividerHorizontal': dividerHorizontal
        };
    }
    _renderItem(data) {
        let viewWidth = this.state.viewWidth;
        let column = this.state.column;
        let dividerHorizontal = this.state.dividerHorizontal;
        let itemWidth = (viewWidth - (dividerHorizontal * column - dividerHorizontal)) / column;
        let renderItem = this.props.renderItem;
        return (
            <View style={{width: itemWidth}}>
                {
                    renderItem && renderItem(data)
                }
            </View>
        );
    }
    render() {
        let refreshControl = this.props.refreshControl ? this.props.refreshControl : null;
        return (
            <View
                style={{flex: 1}}
                onLayout={(event)=> {
                    let width = event.nativeEvent.layout.width;
                    if (!width || width === this.state.viewWidth)
                        return;
                    this.setState({
                        'viewWidth': width,
                        'dataSource': this.props.dataSource
                    })
                }}>
                <ListView
                    style={{flex: 1}}
                    contentContainerStyle={styles.contentContainerStyle}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    refreshControl={refreshControl}
                />
            </View>
        );
    }
}