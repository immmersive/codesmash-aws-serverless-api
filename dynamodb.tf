resource "aws_dynamodb_table" "dynamodb" {
    hash_key         = "pk"
    range_key        = "sk"
    name             = "${var.app_name}_${terraform.workspace}"
    stream_enabled   = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
    billing_mode     = "PAY_PER_REQUEST"

    point_in_time_recovery {
        enabled = true
    }

    attribute {
        name = "pk"
        type = "S"
    }

    attribute {
        name = "sk"
        type = "S"
    }

    attribute {
        name = "type"
        type = "S"
    } 

    global_secondary_index {
        name            = "pk-type-index"
        hash_key        = "pk"
        range_key       = "type"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "sk-type-index"
        hash_key        = "sk"
        range_key       = "type"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type-index"
        hash_key        = "type"
        projection_type = "ALL"
    }
}
