# Define the dates
start_selected_calc <- MYMETA_ORDERS_AND_FINANCES_MODEL$calcMonth_start[1]
end_selected_calc <- MYMETA_ORDERS_AND_FINANCES_MODEL$calcMonth_end[1]
start_comparison_calc <- MYMETA_ORDERS_AND_FINANCES_MODEL$calcMonth_start_comparison[1]
end_comparison_calc <- MYMETA_ORDERS_AND_FINANCES_MODEL$calcMonth_end_comparison[1]

date1 <- as.Date(sprintf("%s-%s-01",
                         start_selected_calc%/%100,
                         1+start_selected_calc%%100
                 ))
date2 <- as.Date(sprintf("%s-%s-01",
                         end_selected_calc%/%100,
                         1+end_selected_calc%%100
                 ))
date3 <- as.Date(sprintf("%s-%s-01",
                         start_comparison_calc%/%100,
                         1+start_comparison_calc%%100
                 ))
date4 <- as.Date(sprintf("%s-%s-01",
                         end_comparison_calc%/%100,
                         1+end_comparison_calc%%100
                 ))

# Convert `Requested delivery date` to dates
MYMETA_ORDERS_AND_FINANCES_MODEL$`Requested delivery date` <- as.Date(MYMETA_ORDERS_AND_FINANCES_MODEL$`Requested delivery date`,
                                                                      format = "%Y-%m-%d")

# Filter the data based on the date ranges
selected_data <- subset(MYMETA_ORDERS_AND_FINANCES_MODEL, `Requested delivery date` >= date1 & `Requested delivery date` <= date2)
comparison_data <- subset(MYMETA_ORDERS_AND_FINANCES_MODEL, `Requested delivery date` >= date3 & `Requested delivery date` <= date4)

# Define the data for the plot
data <- data.frame(
  series = c(rep("Selected", nrow(selected_data)), rep("Comparison", nrow(comparison_data))),
  value = c(selected_data$`Gross Profit #`, comparison_data$`Gross Profit #`)
)

# Aggregate the data by series
data_agg <- aggregate(value ~ series, data, sum)

# define current year visits in percentage
percentage_previous <-data_agg$value[2]/data_agg$value[1]*100
# Define the colors
darkBlue <- "#004EA8"
lightBlue <- "#b0cce8"

# Set the margins using par()
par(mar = c(1, 1, 1, 1))

# Define the plot limits based on the maximum value of value_s and value_c
plot(NULL, xlim=c(0, max(data_agg$value) * 5), ylim=c(0, nrow(data_agg) + 0.5),
     xlab="", ylab="", axes=FALSE, xaxs="i", yaxs="i", xaxt="n", yaxt="n")

# Define the center of the plot
x_center <- 0

# Define the plot limits based on the maximum value of value_s and value_c
plot(NULL, xlim=c(0, x_center + max(data_agg$value) * 2.5), ylim=c(0, nrow(data_agg) + 0.5),
     xlab="", ylab="", axes=FALSE)


# Draw the lollipops
col1 <- lightBlue
col2 <- darkBlue

if (percentage_previous >= 100) {
  col3 <- "#7FEBE2"   # Green color for percentage_visits >= 100
} else {
  col3 <- "#FA7A5A"     # Red color for percentage_visits < 100
}

# Draw the horizontal lines for the Selected series
segments(x_center, 0.8, x_center + data_agg$value[1], col=col1, lwd=15)

# Add circles at the end of the lines for the Selected series
points(x_center + data_agg$value[1]+ max(data_agg$value) * 0.1, 0.8, col=col1, pch=1, cex=8, lwd=15)

# Add labels for the values for the Selected series
text(x_center + data_agg$value[1]+(data_agg$value[1]+data_agg$value[2]) * 0.2, 0.8, labels=sprintf("%.2f M", data_agg$value[1]/1000000), pos=4, cex=5, col=col1)
text(x_center + 0.5*max(data_agg$value),0.5, labels=sprintf("Last Year"), pos=1, cex=5, col=col1)

# Draw the horizontal lines for the Comparison series
segments(x_center, 1.7, x_center + data_agg$value[2], col=col2, lwd=15)

# Add circles at the end of the lines for the Comparison series
points(x_center + data_agg$value[2]+ max(data_agg$value) * 0.1 , 1.7, col=col2, pch=1, cex=8, lwd=15)

# Add labels for the values for the Comparison series
text(x_center + data_agg$value[2]+(data_agg$value[1]+data_agg$value[2]) * 0.2,1.7, labels=sprintf("%.0f %%", percentage_previous), pos=4, cex=5, col=col3)
# Add the legend
# legend("topright", legend=c("Selected", "Comparison"), col=c(darkBlue, lightBlue), pch=c(1,2), lwd=15, cex=3)