import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import CheckBox from "../CheckBox/CheckBox";
import TruncateText from "../TruncateText/TruncateText";
import Input from "../Input/Input";
import styles from "./Checkboxdropdown.module.css";

class CheckboxDropDown extends React.Component {
  constructor(props) {
    super(props);
    console.log("props ", props);
    const options = props.options && props.options.length && props.options.map(item => ({label: item, value: item}))
    this.state = {
      open: false,
      options: this.createOptions(options),
      searchQuery: "",
      searchableOptions: this.createOptions(options),
      title: [],
    };
    this.optionsList = props.defaultSelectAll
      ? this.defaultValue.optionsList
      : props.defaultSelectedValues
      ? this.defaultValue1.optionsList
      : [];
    // document.addEventListener("click", this.handleClickOutside);
  }
  createOptions = optionsData => {
    return optionsData.map(option => {
      return { ...option, isChecked: false };
    });
  };
  toggleDropdown = () => {
    this.setState({ open: !this.state.open });
  };
  closeDropdown = () => {
      console.log("coming here ");
    this.setState({ open: false });
  };
  handleClickOutside = e => {
      this.closeDropdown();
  };

  // method to select all options if defaultSelectAll is true need values in label and value format

  createOptionsList = selectedOption => {
    if (selectedOption.isChecked) {
      const index = this.optionsList.indexOf(selectedOption.value);
      this.optionsList.splice(index, 1);
    } else {
      this.optionsList.push(selectedOption.value);
    }
    let newRecords = this.state.searchableOptions;
    newRecords = newRecords.map(record => {
      const updatedRecord = { ...record };
      if (updatedRecord.value === selectedOption.value) {
        updatedRecord.isChecked = !selectedOption.isChecked;
      }
      return updatedRecord;
    });
    const tempRecords = this.getNewOptions(newRecords);
    if (this.props.selectCompleteObj) {
      this.props.onSelection(selectedOption);
    } else {
      this.props.onSelection(this.optionsList);
    }
    this.setState({
      options: tempRecords,
      title:
        this.optionsList.length === this.props.options.length
          ? ["All"]
          : this.optionsList,
      isSelectedAll: this.optionsList.length === this.props.options.length,
      optionsLength: this.optionsList.length,
      searchableOptions: newRecords,
    });
  };
  resetAllOptions = () => {
    this.optionsList = [];
    let tempOptions = [...this.state.searchableOptions];
    tempOptions = tempOptions.map(record => {
      const modifiedRecord = { ...record };
      modifiedRecord.isChecked = false;
      return modifiedRecord;
    });
    const tempRecords = this.getNewOptions(tempOptions);
    this.setState({
      options: tempRecords,
      title: [this.props.placeholder ? this.props.placeholder : "Select"],
      isSelectedAll: false,
      optionsLength: 0,
      searchableOptions: tempOptions,
      searchQuery: "",
    });
  };

  resetSearch = () => {
    let tempRecords = [...this.state.searchableOptions];
    tempRecords = this.getNewOptions(tempRecords);
    this.setState({
      options: tempRecords,
      title:
        this.optionsList.length === this.props.options.length
          ? ["All"]
          : this.optionsList,
      isSelectedAll: this.optionsList.length === this.props.options.length,
      searchableOptions: tempRecords,
      searchQuery: "",
    });
  };
  searchFilterQueryChange = searchQuery => {
    if (searchQuery.length === 0) {
      this.resetSearch();
    } else {
      let tempOptions = [...this.state.options];
      tempOptions = tempOptions.filter(
        option =>
          option.label &&
          option.label
            .toLowerCase()
            .includes(searchQuery && searchQuery.toLowerCase())
      );
      this.setState({
        searchQuery,
        searchableOptions: tempOptions,
      });
    }
  };

  getNewOptions = tempOptions => {
    let tempRecords = [...this.state.options];
    const searchableOptions = [...tempOptions];
    tempRecords = tempRecords.map(record => {
      let modifiedRecord = record;
      searchableOptions.map(searchableRecord => {
        if (searchableRecord.value === modifiedRecord.value) {
          modifiedRecord = searchableRecord;
        }
        return null;
      });
      return modifiedRecord;
    });
    return tempRecords;
  };

  selectAllOptions = () => {
    this.optionsList = [];
    let tempOptions = [...this.state.options];
    tempOptions = tempOptions.map(record => {
      const modifiedRecord = { ...record };
      modifiedRecord.isChecked = true;
      this.optionsList.push(record.value);
      return modifiedRecord;
    });
    this.props.onSelection(this.optionsList);
    this.setState({
      options: tempOptions,
      title: ["All"],
      isSelectedAll: true,
      optionsLength: this.optionsList.length,
      searchableOptions: tempOptions,
    });
  };
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
  render() {
      console.log("state is ", this.state);
    const optionElements = this.state.searchableOptions.map(
      (optionData, index) => {
        return (
          <div
            key={index}
            className={styles.options}
            onClick={() => this.createOptionsList(optionData)}
          >
              <div className={styles.iconsContainer}>
              <div>
                {this.props.displayLabel ? optionData.label : optionData.value}
              </div>
            </div>
            
            <div>
              <CheckBox
                key={index}
                isChecked={optionData.isChecked}
                onChecked={event => event.stopPropagation()}
              />
            </div>
          </div>
        );
      }
    );
    console.log("option element ", optionElements);
    return (
      <div className={styles.parent}>
        <div
          ref={node => {
            this.node1 = node;
          }}
          className={classNames(
            this.state.optionsLength === 0 ? styles.placeHolder : "",
            styles.label,
            this.props.labelStyles
          )}
          onClick={() => (this.props.isDisabled ? null : this.toggleDropdown())}
        >
          <TruncateText
            text={
              this.state.optionsLength === 0
                ? this.props.placeholder
                  ? this.props.placeholder
                  : "Select"
                : this.state.title.join(", ")
            }
            maxLine="1"
          />
        </div>
        {this.state.open ? (
          <div
            ref={node => {
              this.node = node;
            }}
            style={{ width: `${this.props.width}%` }}
            className={styles.bodyContainer}
          >
            {this.props.searchable && this.props.options.length > 1 ? (
              <Input
                id="content"
                type="text"
                inputGroupStyle={styles.inputGroupStyle}
                inputStyle={styles.input}
                value={this.state.searchQuery}
                autofocus={false}
                callback={e => this.searchFilterQueryChange(e)}
                placeholder={"Search here..."}
              />
            ) : null}
            {this.state.searchableOptions.length !== 0 ? (
              <div className={styles.optionsContainer}>
                {this.state.options.length ===
                  this.state.searchableOptions.length && (
                  <div
                    className={styles.options}
                    onClick={this.toggleSelectAllOptions}
                  >
                    All
                    <div>
                      <CheckBox
                        isChecked={this.state.isSelectedAll}
                        onChecked={event => event.stopPropagation()}
                      />
                    </div>
                  </div>
                )}
                {optionElements}
              </div>
            ) : (
              <div className={styles.noOption}>No Options</div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

CheckboxDropDown.propTypes = {
  /**
   * Options: array of object {label: '', value: ''} which will act as options for dropdown
   */
  options: PropTypes.array,
  /**
   * onSelection: function to execute whenever an option is selected
   */
  onSelection: PropTypes.func,
}

export default CheckboxDropDown;
